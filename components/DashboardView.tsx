import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import DashboardHeader from './DashboardHeader';
import AppContainer from './AppContainer';

const DashboardView: React.SFC = () => {
  return (
    <AppContainer bottomNavigation>
      <DashboardHeader>Dashboard</DashboardHeader>
      <View style={styles.content}></View>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingLeft: '5%',
    paddingRight: '5%'
  }
});

export default DashboardView;
