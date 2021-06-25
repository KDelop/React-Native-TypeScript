import * as React from 'react';
import {ViewProps} from 'react-native';
import {RtcRemoteView} from 'react-native-agora';
import {
  RtcSurfaceViewProps,
  RtcUidProps,
} from 'react-native-agora/lib/src/RtcRenderView.native';

import CameraOffHero from './CameraOffHero';
import MicIsOff from './MicOffOverlay';

interface ICommonProps {
  cameraIsOff?: boolean;
  micIsOff?: boolean;
}

type AndroidRtcRemoteViewProps = ICommonProps &
  ViewProps &
  RtcUidProps &
  RtcSurfaceViewProps & {
    platform: 'android';
  };

type IOSRtcRemoteViewProps = ICommonProps &
  ViewProps &
  RtcUidProps &
  RtcSurfaceViewProps & {
    platform: 'ios';
  };

type AgnositcRtcRemoteViewProps =
  | IOSRtcRemoteViewProps
  | AndroidRtcRemoteViewProps;

const AgnositcRtcRemoteView: React.FunctionComponent<AgnositcRtcRemoteViewProps> = ({
  platform,
  cameraIsOff,
  micIsOff,
  ...rest
}) => {
  const inner = cameraIsOff ? (
    <CameraOffHero style={rest.style} />
  ) : platform === 'android' ? (
    // Android view needs textureView to support border radius
    <RtcRemoteView.TextureView {...rest} />
  ) : (
    <RtcRemoteView.SurfaceView {...rest} />
  );

  return (
    <MicIsOff visible={Boolean(micIsOff)} style={rest.style}>
      {inner}
    </MicIsOff>
  );
};

export default AgnositcRtcRemoteView;
