import * as React from 'react';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import { View, StyleSheet } from 'react-native';

import UserAvatar from './UserAvatar';
import Typography from './Typography';
import { MEDIUM_GREY, BRAND_BLUE } from '../constants/colors';

interface IProps {
  loading: boolean;
  userId?: number;
  firstName?: React.ReactNode;
  lastName?: React.ReactNode;
  city?: React.ReactNode;
  stateProvince?: React.ReactNode;
}

const UserProfileHeader: React.SFC<IProps> = ({
  userId,
  loading,
  firstName,
  lastName,
  city,
  stateProvince
}) => {
  return (
    <View style={styles.header}>
      <UserAvatar userId={userId} size="xlarge" loading={loading} />
      <View style={styles.headerRight}>
        <View style={styles.userNameContainer}>
          <Typography style={styles.userName}>
            {firstName} {lastName}
          </Typography>
          <SimpleLineIcon name="check" size={22} style={styles.verifiedIcon} />
        </View>
        <Typography variant="info" style={styles.location}>
          D.P.T. // {city}, {stateProvince}
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 0,
    flexDirection: 'row'
  },
  headerRight: {
    flex: 1,
    paddingLeft: 20
  },
  location: {
    color: MEDIUM_GREY,
    flex: 1
  },
  userName: {
    flexGrow: 1,
    color: BRAND_BLUE,
    fontSize: 22,
    textTransform: 'uppercase'
  },
  userNameContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  verifiedIcon: {
    padding: 10
  }
});

export default UserProfileHeader;
