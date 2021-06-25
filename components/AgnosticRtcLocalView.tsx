import * as React from 'react';
import {ViewProps} from 'react-native';
import {RtcLocalView} from 'react-native-agora';
import {RtcSurfaceViewProps} from 'react-native-agora/lib/src/RtcRenderView.native';

import CameraOffHero from './CameraOffHero';

interface ICommonProps {
  cameraIsOff?: boolean;
}

type AndroidRtcLocalViewProps = ICommonProps &
  ViewProps &
  RtcSurfaceViewProps & {
    platform: 'android';
  };

type IOSRtcLocalViewProps = ICommonProps &
  ViewProps &
  RtcSurfaceViewProps & {
    platform: 'ios';
  };

type AgnositcRtcLocalViewProps =
  | IOSRtcLocalViewProps
  | AndroidRtcLocalViewProps;

const AgnositcRtcLocalView: React.FunctionComponent<AgnositcRtcLocalViewProps> = ({
  platform,
  cameraIsOff,
  ...rest
}) => {
  if (cameraIsOff) {
    return <CameraOffHero style={rest.style} />;
  }

  return platform === 'android' ? (
    // Android view needs textureView to support border radius
    <RtcLocalView.TextureView {...rest} />
  ) : (
    <RtcLocalView.SurfaceView {...rest} />
  );
};

export default AgnositcRtcLocalView;
