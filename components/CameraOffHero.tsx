import * as React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet, View, ViewProps} from 'react-native';

const CameraOffHero: React.FunctionComponent<Pick<ViewProps, 'style'>> = ({
  style,
}) => {
  return (
    <View style={[styles.root, style]}>
      <MaterialIcon
        name="videocam-off"
        size={40}
        color="rgba(255, 255, 255, 0.4)"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: '100%',
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CameraOffHero;
