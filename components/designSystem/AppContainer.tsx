import * as React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StatusBarStyle,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import Padded from './Padded';

interface IProps {
  statusBarStyle?: StatusBarStyle;
  passthrough?: boolean;
  style?: ViewProps['style'];
}

const AppContainer: React.FunctionComponent<IProps> = ({
  children,
  statusBarStyle = 'dark-content',
  style,
  passthrough,
}) => {
  React.useEffect(() => {
    if (!passthrough) {
      StatusBar.setBarStyle(statusBarStyle);
    }
    // Background is only available on android
    Platform.OS === 'android' && StatusBar.setBackgroundColor('white');
  }, [statusBarStyle, passthrough]);

  const inner = <View style={styles.content}>{children}</View>;

  return passthrough ? (
    inner
  ) : (
    <SafeAreaView style={[styles.root, styles.background, style]}>
      <Padded size={{top: 1}} style={styles.root}>
        {inner}
      </Padded>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  background: {
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
});

export default AppContainer;
