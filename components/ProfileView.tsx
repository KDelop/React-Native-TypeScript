import * as React from 'react';
import { oc } from 'ts-optchain';
import { StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

import AppContainer from './AppContainer';
import BasicHeader from './BasicHeader';
import useUser from '../hooks/useUser';
import UserProfileHeader from './UserProfileHeader';

const ProfileView = () => {
  const {
    state: { params }
  } = useNavigation();
  const [user] = useUser(oc(params).userId());

  return (
    <AppContainer>
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
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 0,
    paddingTop: 20,
    paddingLeft: '5%',
    paddingRight: '5%'
  }
});

export default ProfileView;
