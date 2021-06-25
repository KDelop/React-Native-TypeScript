import * as React from 'react';
import {useMachine} from '@xstate/react';

import streamChatMachine from '../machines/streamChat';

const useStreamChat = (streamId: string, currentUserId: string) => {
  const [state, dispatch] = useMachine(streamChatMachine);
  const engineInstance = state.context.engine;

  React.useEffect(() => {
    if (state.matches('initialized')) {
      dispatch('LOGIN', {
        streamId: streamId,
        userId: currentUserId,
      });
    }
  }, [state.value, streamId, currentUserId]);

  React.useEffect(() => {
    const onMessageReceived = (e: any) => {
      dispatch('MESSAGE', e);
    };

    const onError = (e: any) => {
      console.log(e);
    };

    const onMemberJoined = (e: any) => {
      // TODO: Add message that says user has joined...
      dispatch('MEMBER_JOINED');
    };

    const onMemberLeft = (e: any) => {
      // TODO: Add message that says user has joined...
      dispatch('MEMBER_LEFT');
    };

    engineInstance?.on('channelMemberJoined', onMemberJoined as any);
    engineInstance?.on('channelMemberLeft', onMemberLeft as any);
    engineInstance?.on('channelMessageReceived', onMessageReceived as any);
    engineInstance?.on('error', onError as any);

    return () => {
      engineInstance?.removeEvents();
    };
  }, [engineInstance]);

  return {viewerCount: state.context.viewerCount, state, dispatch};
};

export default useStreamChat;
