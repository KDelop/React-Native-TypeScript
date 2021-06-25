import * as React from 'react';
import { StyleSheet, View, ViewProps, StatusBar } from 'react-native';

import BottomNavigation from './BottomNavigation';
import { SafeAreaView } from 'react-navigation';

interface IProps extends ViewProps {
  bottomNavigation?: boolean;
}

const AppContainer: React.SFC<IProps> = ({
  bottomNavigation,
  children,
  ...rest
}) => {
  StatusBar.setBarStyle('dark-content');

  return (
    <SafeAreaView style={styles.root} {...rest}>
      <View style={styles.contentContainer}>{children}</View>
      {bottomNavigation && <BottomNavigation />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    flex: 1
  }
});

export default AppContainer;
