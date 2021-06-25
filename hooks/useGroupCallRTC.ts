import * as React from 'react';
import {useMachine} from '@xstate/react';
import {UserInfo} from 'react-native-agora';

import {UserContext} from '../components/UserProvider';
import groupCallMachine from '../machines/groupCall';

export type Peer = UserInfo & {
  cameraIsOff?: boolean;
  micIsOff?: boolean;
};

export interface IPeers {
  [k: number]: Peer | null;
}

const useGroupCallRTC = () => {
  const userContext = React.useContext(UserContext);
  const [state, dispatch] = useMachine(groupCallMachine);
  const [peers, setPeers] = React.useState<IPeers>({});
  const engineInstance = state.context.engine;
  const channelId = state.context.channelId || userContext.user?.uid;
  const cameraIsOn = state.context.cameraIsOn;
  const micIsOn = state.context.micIsOn;

  const updatePeerAudioStatus = (pid: number, micIsOff: boolean) => {
    setPeers((x) => ({
      ...x,
      [pid]: {...(x[pid] as Peer), micIsOff},
    }));
  };

  const updatePeerVideoStatus = (pid: number, cameraIsOff: boolean) => {
    setPeers((x) => ({
      ...x,
      [pid]: {...(x[pid] as Peer), cameraIsOff},
    }));
  };

  const updatePeerInfo = (pid: number, userInfo: Peer) => {
    setPeers((x) => ({
      ...x,
      [pid]: {...x[pid], ...userInfo},
    }));
  };

  const addPeer = (pid: number) => {
    setPeers((x) => ({
      ...x,
      [pid]: null,
    }));
  };

  const removePeer = async (pid: number) =>
    setPeers((x) => {
      const {[pid]: _, ...rest} = x;
      return rest;
    });

  React.useEffect(() => {
    engineInstance?.addListener('UserInfoUpdated', updatePeerInfo);
    engineInstance?.addListener('UserJoined', addPeer);
    engineInstance?.addListener('UserOffline', removePeer);
    engineInstance?.addListener('Error', (e) => console.log(e));
    engineInstance?.addListener('UserMuteVideo', updatePeerVideoStatus);
    engineInstance?.addListener('UserMuteAudio', updatePeerAudioStatus);
  }, [engineInstance]);

  return {
    peers,
    channelId,
    cameraIsOn,
    micIsOn,
    state,
    dispatch,
  };
};

export default useGroupCallRTC;
