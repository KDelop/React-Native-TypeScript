import * as React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {VideoRenderMode} from 'react-native-agora';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import {UserContext} from './UserProvider';
import {RootStackParamList} from '../types';
import StreamInCallView from './StreamInCallView';
import AgnositcRtcLocalView from './AgnosticRtcLocalView';
import AgnositcRtcRemoteView from './AgnosticRtcRemoteView';
import NewStreamOverlay from './NewStreamOverlay';
import useStreamRTC from '../hooks/useStreamRTC';
import WaitingForHostView from './WaitingForHostView';
import VideoLoadingView from './VideoLoadingView';

const getPlatform = () => (Platform.OS === 'android' ? 'android' : 'ios');

const StreamView: React.FunctionComponent = () => {
  const {goBack} = useNavigation();
  const {params} = useRoute<RouteProp<RootStackParamList, 'Stream'>>();
  const userContext = React.useContext(UserContext);
  const isHost = params.isHost;
  const {remotePeerUid, streamId, state, dispatch} = useStreamRTC(
    params.streamId,
    isHost,
  );

  const handleOnRequestClose = (onLeave = () => goBack()) => {
    dispatch('LEAVE', {
      onLeave,
    });
  };

  const videoComponent = React.useMemo(() => {
    if (isHost) {
      return (
        <AgnositcRtcLocalView
          channelId={streamId}
          platform={getPlatform()}
          style={styles.fullScreenVideoView}
          renderMode={VideoRenderMode.Hidden}
        />
      );
    }

    // The user is not the host and the host has not arrived
    if (remotePeerUid === undefined) {
      return <WaitingForHostView />;
    }

    if (!isHost) {
      return (
        <AgnositcRtcRemoteView
          uid={remotePeerUid}
          style={styles.fullScreenVideoView}
          platform={getPlatform()}
          renderMode={VideoRenderMode.Hidden}
          channelId={streamId}
        />
      );
    }
  }, [isHost, streamId, remotePeerUid]);

  const inner = React.useMemo(() => {
    if (!['dataEntry', 'inStream'].includes(String(state.value))) {
      return <VideoLoadingView />;
    }

    if (state.matches('dataEntry') || state.matches('creatingStream')) {
      return (
        <>
          <NewStreamOverlay
            onRequestClose={handleOnRequestClose}
            goLiveOnClick={(title, description) => {
              dispatch('SUBMIT', {
                title,
                description,
              });
            }}
          />
          {videoComponent}
        </>
      );
    } else {
      return (
        <>
          <StreamInCallView
            streamId={streamId}
            onRequestClose={handleOnRequestClose}
            currentUserId={userContext.user?.uid ?? ''}
          />
          {videoComponent}
        </>
      );
    }
  }, [
    state,
    handleOnRequestClose,
    streamId,
    userContext.user?.uid,
    videoComponent,
  ]);

  return <View style={styles.root}>{inner}</View>;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'black',
  },
  fullScreenVideoView: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
});

export default StreamView;
