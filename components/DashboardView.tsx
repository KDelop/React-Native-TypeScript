import * as React from 'react';
import {StyleSheet, ScrollView, View, Dimensions} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import DashboardHeader from './DashboardHeader';
import useUpdateFCMToken from '../hooks/useUpdateFCMToken';
import {BLUE_GREY} from './colors';
import {UserContext} from './UserProvider';
import DashboardSchedule from './DashboardSchedule';
import DashboardHealthStats from './DashboardHealthStats';
import DashboardMore from './DashboardMore';

const requestPermissions = async () => {
  await messaging().requestPermission();
};

const DashboardView = () => {
  useUpdateFCMToken();
  const userContext = React.useContext(UserContext);

  React.useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <>
      <DashboardHeader userId={userContext.user?.uid} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{paddingBottom: 50}}
        showsVerticalScrollIndicator={false}>
        <DashboardSchedule />
        <DashboardHealthStats />
        <DashboardMore />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  schedule: {
    backgroundColor: 'white',
  },
  scrollView: {
    backgroundColor: BLUE_GREY,
  },
});

export default DashboardView;
