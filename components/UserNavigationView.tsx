import * as React from 'react';
import {
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import config from '../config.json';
import AppContainer from './AppContainer';
import useCurrentUser from '../hooks/useCurrentUser';
import Typography from './Typography';
import UserNavigationMenu from './UserNavigationMenu';
import useLogout from '../hooks/useLogout';
import { BRAND_RED } from '../constants/colors';

const UserNavigationView: React.SFC = () => {
  StatusBar.setBarStyle('light-content');
  const [error, loading, currentUser] = useCurrentUser();
  const [logout] = useLogout();

  const splitName = currentUser?.name?.split(' ');

  return (
    <AppContainer>
      <ScrollView>
        <View>
          <View style={styles.imageOverlay}>
            <Typography style={styles.userName}>{splitName?.[0]}</Typography>
            <Typography style={styles.userName}>{splitName?.[1]}</Typography>
          </View>
          <Image
            style={styles.image}
            width={Dimensions.get('screen').width}
            height={Dimensions.get('screen').height * 0.45}
            source={{
              uri: `${config.apiUri}/userData/${currentUser?.id}/profile.jpg`
            }}
            defaultSource={require('../assets/images/default-profile.png')}
          />
        </View>
        <UserNavigationMenu />
        <TouchableOpacity onPress={() => logout()} style={styles.logoutButton}>
          <Typography variant="body2" style={styles.logoutText}>
            Logout
          </Typography>
        </TouchableOpacity>
      </ScrollView>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  userName: {
    fontStyle: 'normal'
  },
  imageOverlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 0,
    justifyContent: 'flex-end',
    paddingLeft: '8%',
    paddingRight: '8%',
    paddingBottom: '35%'
  },
  logoutButton: {
    flex: 0,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
    width: '100%'
  },
  logoutText: {
    color: BRAND_RED
  },
  image: {
    resizeMode: 'cover',
    zIndex: -1
  }
});

export default UserNavigationView;
