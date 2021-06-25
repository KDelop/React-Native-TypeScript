import {gql} from '@apollo/client';
import RtcEngine, {
  ChannelProfile,
  ClientRole,
  VideoFrameRate,
} from 'react-native-agora';
import {assign, createMachine} from 'xstate';
import functions from '@react-native-firebase/functions';

import {client} from '../apollo/config';
import {agoraAppId} from '../constants/apiKeys';

const ENTER_STREAM_MUTATION = gql`
  mutation EnterStream($streamId: String!) {
    enterStream(streamId: $streamId) {
      id
    }
  }
`;

const EXIT_STREAM_MUTATION = gql`
  mutation ExitStream {
    exitStream {
      id
    }
  }
`;

const enterStream = (streamId: string) =>
  client.mutate({
    mutation: ENTER_STREAM_MUTATION,
    variables: {streamId},
  });

const exitStream = () =>
  client.mutate({
    mutation: EXIT_STREAM_MUTATION,
  });

const CREATE_STREAM_MUTATION = gql`
  mutation CreateStream($stream: ImpromptuStreamInput!) {
    enterImpromptuStream(stream: $stream) {
      id
      initiatedBy {
        id
      }
    }
  }
`;

interface IStream {
  title: string;
  description: string;
}

const createStream = async (stream: IStream) => {
  const result = await client.mutate({
    mutation: CREATE_STREAM_MUTATION,
    variables: {
      stream,
    },
  });

  const enterImpromptuStream = result.data?.enterImpromptuStream;
  return {
    id: enterImpromptuStream?.id,
    isHost: true,
    userId: enterImpromptuStream?.initiatedBy?.id,
  };
};

const getStreamToken = async (streamId: string) => {
  const {data} = await functions().httpsCallable('generateRTCToken')({
    channelName: streamId,
  });

  return data?.key;
};

interface IContext {
  engine: RtcEngine | null;
  streamId: string | null;
  errors: Array<string>;
}

const streamMachine = createMachine<IContext>(
  {
    id: 'stream',
    initial: 'initializing',
    context: {
      engine: null,
      streamId: null,
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
        on: {
          CREATE: {
            target: 'dataEntry',
          },
          JOIN: {
            target: 'joiningStream',
            actions: 'setStreamId',
          },
        },
      },
      dataEntry: {
        invoke: {
          src: 'startPreview',
          onError: {
            target: 'rtcClientFailure',
            actions: 'reset',
          },
        },
        on: {
          LEAVE: {
            target: 'leavingStream',
          },
          SUBMIT: {
            target: 'creatingStream',
          },
        },
      },
      creatingStream: {
        invoke: {
          src: 'createStream',
          onDone: {
            target: 'joiningStream',
            actions: 'setStreamId',
          },
          onError: {
            target: 'dataEntry',
            actions: 'addCreateStreamError',
          },
        },
      },
      joiningStream: {
        invoke: {
          src: 'joinStream',
          onDone: {
            target: 'inStream',
          },
          onError: {
            target: 'rtcClientFailure',
            actions: 'reset',
          },
        },
      },
      inStream: {
        on: {
          LEAVE: {
            target: 'leavingStream',
          },
        },
      },
      leavingStream: {
        invoke: {
          src: 'leaveStream',
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
        errors: (_) => [],
      }),
      setStreamId: assign({
        streamId: (_, event) => event.data?.id || event?.id,
      }),
      addCreateStreamError: assign({
        errors: (_) => ['Something went wrong trying to create this stream!'],
      }),
    },
    services: {
      initialize: async () => {
        const engine = await RtcEngine.create(agoraAppId);
        await engine.setVideoEncoderConfiguration({
          frameRate: VideoFrameRate.Fps30,
          bitrate: 400,
        });
        await engine.setChannelProfile(ChannelProfile.LiveBroadcasting);
        await engine.enableVideo();
        return engine;
      },
      startPreview: async (ctx) => {
        await ctx.engine?.setClientRole(ClientRole.Broadcaster);
        await ctx.engine?.startPreview();
      },
      createStream: (_, event) =>
        createStream({title: event.title, description: event.description}),
      joinStream: async (ctx, event) => {
        const evt = event.data || event;

        if (!ctx.streamId) {
          throw new Error('streamId must be set to join stream.');
        }

        await enterStream(ctx.streamId);
        const token = await getStreamToken(ctx?.streamId);
        await ctx.engine?.setClientRole(
          evt.isHost ? ClientRole.Broadcaster : ClientRole.Audience,
        );
        await ctx.engine?.registerLocalUserAccount(agoraAppId, evt?.userId);
        await ctx.engine?.stopPreview();
        await ctx.engine?.joinChannelWithUserAccount(
          token,
          ctx?.streamId,
          evt?.userId,
        );
      },
      leaveStream: async (ctx, event) => {
        await ctx.engine?.leaveChannel();
        await ctx.engine?.destroy();
        await exitStream();
        event?.onLeave && event?.onLeave();
      },
    },
  },
);

export default streamMachine;
