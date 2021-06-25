import * as React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {BRAND_RED, LIGHT_BRAND_RED} from './colors';

interface IProps extends ViewProps {
  visible: boolean;
}

const MicIsOff: React.FunctionComponent<IProps> = ({
  visible,
  children,
  ...rest
}) => {
  return (
    <View {...rest}>
      {children}
      {visible && (
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.muteIcon}>
            <MaterialIcon size={18} name="mic-off" color="white" />
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  muteIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 6,
    margin: 20,
    borderRadius: 100,
  },
  safeArea: {
    flex: 0,
    alignItems: 'flex-start',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default MicIsOff;
