import * as React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

import UserAvatar from './UserAvatar';
import { BRAND_BLUE } from '../constants/colors';
import useCurrentUser from '../hooks/useCurrentUser';

const DashboardHeader: React.SFC = ({ children }) => {
  const [error, loading, currentUser] = useCurrentUser();
  const { navigate } = useNavigation();

  const openNavigation = React.useCallback(() => {
    navigate('UserNavigation');
  }, []);

  const openMessages = React.useCallback(() => {
    navigate('Messages');
  }, []);

  return (
    <View style={styles.container}>
      <UserAvatar
        loading={loading}
        userId={currentUser?.id}
        button
        TouchableOpacityProps={{ onPress: openNavigation }}
      />
      <Text style={styles.heading}>{children}</Text>
      <TouchableOpacity onPress={openMessages}>
        <FeatherIcon name="message-circle" size={26} color={BRAND_BLUE} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginLeft: '5%',
    marginRight: '5%',
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  heading: {
    fontFamily: 'Montserrat',
    fontSize: 22,
    fontWeight: '800',
    color: BRAND_BLUE,
    marginLeft: 23,
    fontStyle: 'italic',
    textTransform: 'uppercase',
    flex: 1
  }
});

export default DashboardHeader;
