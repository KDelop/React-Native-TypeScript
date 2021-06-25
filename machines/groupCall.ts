import RtcEngine, {VideoFrameRate} from 'react-native-agora';
import {assign, createMachine} from 'xstate';
import functions from '@react-native-firebase/functions';

import {agoraAppId} from '../constants/apiKeys';

const getGroupCallToken = async (channelId: string) => {
  const {data} = await functions().httpsCallable('generateRTCToken')({
    channelName: channelId,
  });

  return data?.key;
};

interface IContext {
  engine: RtcEngine | null;
  channelId: string | null;
  userId: string | null;
  cameraIsOn: boolean;
  micIsOn: boolean;
  errors: Array<string>;
}

const toggleStates = {
  togglingMic: {
    invoke: {
      src: 'toggleMic',
      onDone: {
        target: 'idle',
        actions: 'toggleMic',
      },
      onError: {
        target: 'idle',
      },
    },
  },
  togglingCamera: {
    invoke: {
      src: 'toggleCamera',
      onDone: {
        target: 'idle',
        actions: 'toggleCamera',
      },
      onError: {
        target: 'idle',
      },
    },
  },
  flippingCamera: {
    invoke: {
      src: 'flipCamera',
      onDone: {
        target: 'idle',
      },
      onError: {
        target: 'idle',
      },
    },
  },
};

const groupCallMachine = createMachine<IContext>(
  {
    id: 'groupCall',
    initial: 'initializing',
    context: {
      engine: null,
      channelId: null,
      userId: null,
      micIsOn: true,
      cameraIsOn: true,
      errors: [],
    },
    states: {
      initializing: {
        invoke: {
          src: 'initialize',
          onDone: {
            target: 'initialized',
            actions: 'setEngine',
          },
          onError: {
            target: 'rtcClientFailure',
            actions: 'reset',
          },
        },
      },
      initialized: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              TOGGLE_MIC: {
                target: 'togglingMic',
              },
              TOGGLE_CAMERA: {
                target: 'togglingCamera',
              },
              FLIP_CAMERA: {
                target: 'flippingCamera',
              },
            },
          },
          ...toggleStates,
        },
        on: {
          JOIN: {
            target: 'joiningCall',
          },
          LEAVE: {
            target: 'leavingCall',
          },
        },
      },
      joiningCall: {
        invoke: {
          src: 'joinCall',
          onDone: {
            target: 'inCall',
            actions: 'setChannelId',
          },
          onError: {
            target: 'rtcClientFailure',
            actions: 'reset',
          },
        },
      },
      inCall: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              TOGGLE_MIC: {
                target: 'togglingMic',
              },
              TOGGLE_CAMERA: {
                target: 'togglingCamera',
              },
              FLIP_CAMERA: {
                target: 'flippingCamera',
              },
            },
          },
          ...toggleStates,
        },
        on: {
          LEAVE: {
            target: 'leavingCall',
          },
        },
      },
      leavingCall: {
        invoke: {
          src: 'leaveCall',
          onDone: {
            target: 'inactive',
            actions: 'reset',
          },
          onError: {
            target: 'inactive',
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
      rtcClientFailure: {
        on: {
          RETRY: {
            target: 'initializing',
          },
        },
      },
    },
  },
  {
    actions: {
      setEngine: assign({
        engine: (_, event) => event.data,
      }),
      reset: assign({
        engine: (_) => null,
        channelId: (_) => null,
        errors: (_) => [],
      }),
      setChannelId: assign((_, event) => ({
        channelId: event.data?.channelId,
      })),
      toggleMic: assign({
        micIsOn: (ctx) => !ctx.micIsOn,
      }),
      toggleCamera: assign({
        cameraIsOn: (ctx) => !ctx.cameraIsOn,
      }),
    },
    services: {
      initialize: async () => {
        const engine = await RtcEngine.create(agoraAppId);
        await engine.setVideoEncoderConfiguration({
          frameRate: VideoFrameRate.Fps30,
          bitrate: 400,
        });
        await engine.enableVideo();
        await engine.startPreview();
        return engine;
      },
      joinCall: async (ctx, event) => {
        const channelId =
          event.channelId ??
          event.attendees
            ?.map((x: any) => x.id)
            .sort()
            .join('');

        const token = await getGroupCallToken(channelId);
        await ctx.engine?.registerLocalUserAccount(agoraAppId, event.userId);
        await ctx.engine?.stopPreview();
        await ctx.engine?.joinChannelWithUserAccount(
          token,
          channelId,
          event.userId,
        );
        return channelId;
      },
      leaveCall: async (ctx, event) => {
        await ctx.engine?.leaveChannel();
        await ctx.engine?.destroy();
        event?.onLeave && event?.onLeave();
      },
      toggleMic: async (ctx) => {
        await ctx.engine?.muteLocalAudioStream(ctx.micIsOn);
      },
      toggleCamera: async (ctx) => {
        await ctx.engine?.muteLocalVideoStream(ctx.cameraIsOn);
      },
      flipCamera: async (ctx) => {
        await ctx.engine?.switchCamera();
      },
    },
    guards: {
      callIdInEventPayload: (_, event) => Boolean(event.callId),
      existingCallFound: (_, event) => Boolean(event.data?.channelId),
    },
  },
);

export default groupCallMachine;
