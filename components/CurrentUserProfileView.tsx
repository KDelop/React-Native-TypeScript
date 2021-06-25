import * as React from 'react';
import { oc } from 'ts-optchain';
import { View, StyleSheet, ScrollView } from 'react-native';

import BasicHeader from './BasicHeader';
import useCurrentUser from '../hooks/useCurrentUser';
import UserProfileHeader from './UserProfileHeader';

const CurrentUserProfileView = () => {
  const [user] = useCurrentUser();

  return (
    <View style={styles.container}>
      <BasicHeader title="Profile" />
      <ScrollView style={styles.content}>
        <UserProfileHeader
          firstName={oc(user).firstName()}
          lastName={oc(user).lastName()}
          userId={oc(user).id()}
          city={oc(user).city()}
          stateProvince={oc(user).stateProvince()}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 0,
    paddingTop: 20,
    paddingLeft: '5%',
    paddingRight: '5%'
  }
});

export default CurrentUserProfileView;
