import * as React from 'react';
import { StyleSheet, NativeModules } from 'react-native';
import RtcEngine, { RtcLocalView, RtcRemoteView } from 'react-native-agora';

import AppContainer from './AppContainer';
import {
  VideoRenderMode,
  ClientRole,
  VideoFrameRate,
  ChannelProfile
} from 'react-native-agora/lib/Types';
import GradientButton from './GradientButton';

const LiveStreamProducerView = () => {
  const [peerId, setPeerId] = React.useState(0);
  const engineRef = React.useRef<RtcEngine>();
  React.useEffect(() => {
    const initRtc = async () => {
      const client = (engineRef.current = await RtcEngine.create(
        '7ba83439e8174936b8b6408fe5b3fae2'
      ));
      client.setChannelProfile(ChannelProfile.LiveBroadcasting);
      client.enableVideo();
      client.setVideoEncoderConfiguration({
        dimensions: {
          width: 720,
          height: 1080
        },
        minFrameRate: VideoFrameRate.Fps30
      });
      client.addListener('UserEnableLocalVideo', () => {
        console.log('Video enabled');
      });
      client.addListener('Error', e => {
        console.log(e);
      });
      client.addListener('JoinChannelSuccess', (x, myuid) => {
        console.log('joined channel', x);
      });
      client.addListener('UserJoined', x => {
        setPeerId(x);
        console.log('User Joined', x);
      });
      client.addListener('UserOffline', () => {
        console.log('Offline');
      });
    };

    initRtc();

    return () => {
      engineRef.current?.leaveChannel();
      engineRef.current?.destroy();
    };
  }, []);

  return (
    <AppContainer>
      <RtcRemoteView.SurfaceView
        style={styles.camera}
        channelId="derp"
        uid={peerId}
        zOrderMediaOverlay
        zOrderOnTop
        renderMode={VideoRenderMode.Hidden}
      />
      <RtcLocalView.SurfaceView
        channelId="derp"
        style={styles.camera}
        zOrderMediaOverlay
        renderMode={VideoRenderMode.Hidden}
      />
      <GradientButton
        TouchableOpacityProps={{
          onPress: () => {
            engineRef.current?.setClientRole(ClientRole.Audience);
            engineRef.current?.joinChannel(null, 'derp', null, 0);
          }
        }}
      >
        View
      </GradientButton>
      <GradientButton
        TouchableOpacityProps={{
          onPress: () => {
            engineRef.current?.setClientRole(ClientRole.Broadcaster);
            engineRef.current?.joinChannel(null, 'derp', null, 0);
          }
        }}
      >
        Broadcast
      </GradientButton>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    backgroundColor: 'red'
  }
});

export default LiveStreamProducerView;
