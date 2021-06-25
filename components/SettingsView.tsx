import * as React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

import {LIGHT_GREY} from './colors';
import SettingsListItem from './SettingsListItem';
import useCurrentUser from '../hooks/useCurrentUser';
import Typography from './designSystem/Typography';
import AppContainer from './designSystem/AppContainer';
import Padded from './designSystem/Padded';
import UserAvatar from './UserAvatar';
import ViewHeader from './designSystem/ViewHeader';
import useSignOut from '../hooks/useSignOut';
import {useModal} from '../hooks/useModal';
import useImageUpload from '../hooks/useImageUpload';
import {IHandle} from './ProfilePicture';

const SettingsView = () => {
  const userAvatarRef = React.useRef<IHandle | null>(null);
  const user = useCurrentUser();
  const {navigate} = useNavigation();
  const [signOutResult, signOut] = useSignOut();
  const openModal = useModal();
  const [uploadError, uploadLoading, openImagePicker] = useImageUpload({
    title: 'Upload Profile Photo',
    onComplete: () => userAvatarRef.current?.refresh(),
  });

  if (user.status !== 'success') {
    return null;
  }

  return (
    <>
      <AppContainer
        statusBarStyle="dark-content"
        style={styles.contentContainer}>
        <ViewHeader />
        <ScrollView style={styles.scrollView}>
          <Padded size={{left: 5, right: 5}}>
            <View style={styles.userInfo}>
              <UserAvatar
                ref={(e) => (userAvatarRef.current = e)}
                userId={user.data.id}
                halo={user.data.get('isPro') ? 'red' : 'grey'}
              />
              <Padded size={{left: 3, bottom: 10}}>
                <Typography variant="settingsViewHeading">
                  {user.data.get('firstName')}
                </Typography>
                <Typography variant="settingsViewHeading">
                  {user.data.get('lastName')}
                </Typography>
              </Padded>
            </View>
            <View style={styles.menu}>
              <SettingsListItem
                onPress={() => openModal('Profile', {userId: user.data.id})}
                icon={<FeatherIcon name="user" size={24} color={LIGHT_GREY} />}
                text="View Profile"
              />
              <SettingsListItem
                onPress={() => openImagePicker()}
                icon={
                  <MaterialIcon
                    name="add-a-photo"
                    size={24}
                    color={LIGHT_GREY}
                  />
                }
                loading={uploadLoading}
                text="Upload Profile Image"
              />
              <SettingsListItem
                onPress={() => navigate('ChatList')}
                icon={
                  <FeatherIcon
                    name="message-circle"
                    size={24}
                    color={LIGHT_GREY}
                  />
                }
                text="Messages"
              />
              <SettingsListItem
                icon={<AntIcon name="calendar" size={24} color={LIGHT_GREY} />}
                text="Schedule"
                hideBorder
              />
            </View>
            {/* <View style={[styles.menu, styles.menuLower]}>
              <SettingsListItem
              icon={<OctoIcon name="jersey" size={24} color={LIGHT_GREY} />}
              text="My Team"
            />
              <SettingsListItem
                icon={
                  <MaterialCommunityIcon
                    name="shield-check-outline"
                    size={24}
                    color={LIGHT_GREY}
                  />
                }
                text="Data Privacy"
              />
              <SettingsListItem
                icon={
                  <MaterialCommunityIcon
                    name="cog"
                    size={24}
                    color={LIGHT_GREY}
                  />
                }
                text="Settings"
                hideBorder
              />
            </View> */}
          </Padded>
        </ScrollView>
        <Padded size={{bottom: 5}} style={styles.logoutContainer}>
          <TouchableOpacity onPress={() => signOut()}>
            <Typography variant="settingsLogoutText">Logout</Typography>
          </TouchableOpacity>
        </Padded>
      </AppContainer>
    </>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    flexDirection: 'row',
    flex: 0,
    alignItems: 'flex-start',
  },
  scrollView: {
    paddingTop: 15,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  menuLower: {
    marginTop: 25,
  },
  menu: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowOffset: {height: 2, width: 0},
    shadowRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  image: {
    resizeMode: 'cover',
    height: '45%',
  },
  logoutContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SettingsView;
