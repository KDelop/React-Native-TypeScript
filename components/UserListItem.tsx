import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import UserAvatar from './UserAvatar';
import UserListItemContent from './UserListItemContent';

interface IProps {
  loading: boolean;
  borderBottom?: boolean;
  userId?: number;
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
}

export const ITEM_HEIGHT = 105;

const UserListItem: React.SFC<IProps> = ({
  borderBottom,
  userId,
  loading,
  primary,
  secondary
}) => {
  return (
    <View style={[styles.container, borderBottom && styles.borderBottom]}>
      <UserAvatar size="medium" userId={userId} loading={loading} />
      <UserListItemContent
        primary={primary}
        secondary={secondary}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)'
  },
  container: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: '5%',
    paddingRight: '5%',
    height: ITEM_HEIGHT
  }
});

export default UserListItem;
