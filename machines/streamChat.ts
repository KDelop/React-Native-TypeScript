import RtmEngine from 'agora-react-native-rtm';
import {RTMChannelMessage} from 'agora-react-native-rtm/lib/types';
import functions from '@react-native-firebase/functions';
import {assign, createMachine} from 'xstate';

import {agoraAppId} from '../constants/apiKeys';

export interface IRTMMessage extends RTMChannelMessage {
  type: 'message';
}

interface IContext {
  messages: ReadonlyArray<IRTMMessage>;
  engine: RtmEngine | null;
  userId: string | null;
  streamId: string | null;
  viewerCount: number | null;
}

const streamChatMachine = createMachine<IContext>(
  {
    id: 'streamChat',
    initial: 'initializing',
    context: {
      engine: null,
      userId: null,
      streamId: null,
      messages: [],
      viewerCount: null,
    },
    states: {
      initializing: {
        always: {
          target: 'initialized',
          actions: 'setRTMEngine',
        },
      },
      initialized: {
        on: {
          LOGIN: {
            target: 'loggingIn',
            actions: 'setStreamContext',
          },
        },
      },
      loggingIn: {
        invoke: {
          src: 'login',
          onDone: {
            target: 'ready',
            actions: 'setViewerCount',
          },
          onError: {
            target: 'rtmClientFailure',
          },
        },
      },
      ready: {
        type: 'parallel',
        states: {
          incoming: {
            initial: 'waitingForIncomingMessages',
            states: {
              waitingForIncomingMessages: {
                on: {
                  MESSAGE: {
                    target: 'waitingForIncomingMessages',
                    actions: 'appendMessage',
                  },
                },
              },
            },
          },
          outgoing: {
            initial: 'dataEntry',
            states: {
              dataEntry: {
                on: {
                  SEND: {
                    target: 'sendingMessage',
                  },
                },
              },
              sendingMessage: {
                invoke: {
                  src: 'sendMessage',
                  onDone: {
                    target: 'dataEntry',
                    actions: 'appendMessage',
                  },
                  onError: {
                    target: 'sendMessageFailed',
                  },
                },
              },
              sendMessageFailed: {
                on: {
                  RETRY: {
                    target: 'dataEntry',
                  },
                },
              },
            },
          },
        },
      },
      logout: {
        invoke: {
          src: 'logout',
          onDone: {
            target: 'inactive',
            actions: 'reset',
          },
          onError: {
            target: 'rtmClientFailure',
            actions: 'reset',
          },
        },
      },
      inactive: {
        on: {
          INITIALIZE: {
            target: 'initializing',
          },
        },
      },
      rtmClientFailure: {
        on: {
          RETRY: {
            target: 'initializing',
          },
        },
      },
    },
    on: {
      MEMBER_LEFT: {
        actions: 'decrementViewerCount',
      },
      MEMBER_JOINED: {
        actions: 'incrementViewerCount',
      },
      LOGOUT: {
        target: 'logout',
      },
    },
  },
  {
    actions: {
      setRTMEngine: assign((_) => ({
        engine: new RtmEngine(),
      })),
      incrementViewerCount: assign((ctx) => ({
        viewerCount: (ctx.viewerCount ?? 0) + 1,
      })),
      decrementViewerCount: assign((ctx) => ({
        viewerCount: (ctx.viewerCount ?? 0) - 1,
      })),
      appendMessage: assign((ctx, event) => ({
        messages: ctx.messages.concat([
          {...(event?.data ?? event), type: 'message'},
        ] as any),
      })),
      reset: assign((_) => ({
        engine: null,
        messages: [],
        userId: null,
        streamId: null,
      })),
      setStreamContext: assign((_, event) => ({
        userId: event.userId,
        streamId: event.streamId,
      })),
      setViewerCount: assign((_, event) => ({
        viewerCount: event.data?.viewerCount,
      })),
    },
    services: {
      login: async (ctx) => {
        const {data} = await functions().httpsCallable('generateRTMToken')();
        await ctx.engine?.createClient(agoraAppId);
        await ctx.engine?.login({
          uid: ctx?.userId as string,
          token: data?.key,
        });
        await ctx.engine?.joinChannel(ctx?.streamId as string);
        const viewers = await ctx.engine?.getChannelMembersBychannelId(
          ctx.streamId as string,
        );
        return {viewerCount: viewers?.members?.length ?? 0};
      },
      logout: async (ctx) => {
        await ctx.engine?.logout();
        await ctx.engine?.destroyClient();
      },
      sendMessage: async (ctx, event) => {
        const text = JSON.stringify(event.data);
        await ctx.engine?.sendMessageByChannelId(ctx?.streamId as string, text);

        return {
          ts: Date.now(),
          channelId: ctx.streamId,
          uid: ctx.userId,
          text,
        };
      },
    },
  },
);

export default streamChatMachine;
