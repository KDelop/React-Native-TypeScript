import * as React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import OctoIcon from 'react-native-vector-icons/Octicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from 'react-navigation-hooks';
import { View, StyleSheet } from 'react-native';

import UserNavigationItem, { HEIGHT } from './UserNavigationItem';
import { LIGHT_GREY } from '../constants/colors';
import useCurrentUser from '../hooks/useCurrentUser';
import UserProfileButton from './UserProfileButton';
import NavigationButton from './NavigationButton';

const UserNavigationMenu: React.SFC = () => {
  const [error, loading, currentUser] = useCurrentUser();

  return (
    <View>
      <View style={[styles.menu, styles.menuUpper]}>
        <UserNavigationItem
          icon={
            <MaterialIcon
              name="shield-check-outline"
              size={28}
              color={LIGHT_GREY}
            />
          }
          text="Data Privacy"
        />
        <UserProfileButton userId={currentUser?.id}>
          <UserNavigationItem
            icon={<FeatherIcon name="user" size={28} color={LIGHT_GREY} />}
            text="View Profile"
            hideBorder
          />
        </UserProfileButton>
      </View>
      <View style={[styles.menu, styles.menuLower]}>
        <NavigationButton to="Messages">
          <UserNavigationItem
            icon={
              <FeatherIcon name="message-circle" size={28} color={LIGHT_GREY} />
            }
            text="Messages"
          />
        </NavigationButton>
        <NavigationButton to="Schedule">
          <UserNavigationItem
            icon={<AntIcon name="calendar" size={28} color={LIGHT_GREY} />}
            text="Schedule"
          />
        </NavigationButton>
        <UserNavigationItem
          icon={<OctoIcon name="jersey" size={28} color={LIGHT_GREY} />}
          text="My Team"
        />
        <UserNavigationItem
          icon={<MaterialIcon name="settings" size={28} color={LIGHT_GREY} />}
          text="Settings"
        />
        {/* <UserNavigationItem
          icon={<FontAwesomeIcon name="user-md" size={28} color={LIGHT_GREY} />}
          text="Find A Pro"
        />
        <UserNavigationItem
          icon={
            <MaterialIcon
              name="account-plus-outline"
              size={28}
              color={LIGHT_GREY}
            />
          }
          text="Invite Friends"
          hideBorder
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuUpper: {
    marginTop: -HEIGHT
  },
  menuLower: {
    marginTop: 25
  },
  menu: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowOffset: { height: 2, width: 0 },
    shadowRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    marginLeft: '8%',
    marginRight: '8%'
  }
});

export default UserNavigationMenu;
