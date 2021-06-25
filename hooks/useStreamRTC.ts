import * as React from 'react';
import {useMachine} from '@xstate/react';

import streamMachine from '../machines/stream';
import {UserContext} from '../components/UserProvider';

const useStreamRTC = (streamId: string, isHost?: boolean) => {
  const [peers, setPeers] = React.useState<Set<number>>(new Set());
  const [state, dispatch] = useMachine(streamMachine);
  const userContext = React.useContext(UserContext);
  const engineInstance = state.context.engine;

  const addPeer = (pid: number) => setPeers((x) => new Set([...x, pid]));

  const removePeer = async (pid: number) =>
    setPeers((x) => new Set([...x].filter((peerId) => peerId !== pid)));

  React.useEffect(() => {
    if (streamId && state.matches('initialized')) {
      dispatch('JOIN', {
        id: streamId,
        userId: userContext.user?.uid,
        isHost,
      });
    }

    if (!streamId && state.matches('initialized')) {
      dispatch('CREATE');
    }
  }, [state.value]);

  React.useEffect(() => {
    engineInstance?.addListener('UserJoined', addPeer);
    engineInstance?.addListener('UserOffline', removePeer);
    engineInstance?.addListener('Error', (e) => console.log(e));
  }, [engineInstance]);

  const [remotePeerUid] = peers.values();

  return {
    remotePeerUid,
    streamId: state.context.streamId || (userContext.user?.uid as string),
    dispatch,
    state,
  };
};

export default useStreamRTC;
