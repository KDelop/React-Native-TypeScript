import * as React from 'react';
import {
  BlurViewProperties,
  BlurView as BlurViewOrig,
} from '@react-native-community/blur';
import {Platform} from 'react-native';
import {View} from 'react-native';

const BlurView: React.FunctionComponent<BlurViewProperties> = ({
  style,
  children,
  ...rest
}) => {
  return Platform.OS === 'ios' ? (
    <BlurViewOrig style={style} {...rest}>
      {children}
    </BlurViewOrig>
  ) : (
    <View style={[{backgroundColor: 'rgba(0, 0, 0, 0.6)'}, style]}>
      {children}
    </View>
  );
};

export default BlurView;
