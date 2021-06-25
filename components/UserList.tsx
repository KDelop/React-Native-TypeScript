import * as React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import useUsers from '../hooks/useUsers';
import ListItem from './designSystem/ListItem';
import UserAvatar from './UserAvatar';
import Typography from './designSystem/Typography';
import ListPlaceholder from './designSystem/ListPlaceholder';
import {IUser} from '../types';

export interface IProps {
  onUserClick: (user: IUser) => void;
  searchTerm?: string;
  rightAdornmentRenderer?(user: IUser): React.ReactNode;
}

const UserList: React.FunctionComponent<IProps> = ({
  onUserClick,
  searchTerm = '',
  rightAdornmentRenderer,
}) => {
  const users = useUsers();

  const filterUsers = (searchTerm: string) => (userItem: IUser) => {
    const term = `${userItem.firstName} ${userItem.lastName} ${userItem.city} ${userItem.state}`.toLowerCase();
    return term.includes(searchTerm.toLowerCase());
  };

  return (
    <FlatList
      style={styles.list}
      data={
        users.status === 'success'
          ? users?.data?.filter(filterUsers(searchTerm))
          : []
      }
      contentContainerStyle={styles.listContentContainer}
      ListEmptyComponent={() => {
        if (users.status === 'loading') {
          return <ListPlaceholder.Loading />;
        }

        if (searchTerm && users.status === 'success' && users.data.length > 0) {
          return <ListPlaceholder.NoSearchResults searchTerm={searchTerm} />;
        }

        return null;
      }}
      renderItem={({item: user, index}) => (
        <ListItem
          showDivider={
            users.status === 'success' && index < users.data.length - 1
          }
          onPress={() => onUserClick(user)}
          leftAdornment={<UserAvatar diameter={50} userId={user.id} />}
          rightAdornment={
            rightAdornmentRenderer && rightAdornmentRenderer(user)
          }
          content={
            <>
              <Typography variant="listItemPrimary">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="listItemSecondary">
                {user.isPro ? 'Pro' : 'Athlete'}
              </Typography>
              <Typography variant="listItemTertiary">
                {user.city}, {user.state}
              </Typography>
            </>
          }
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingTop: 12,
  },
  listContentContainer: {
    paddingBottom: 12,
  },
});

export default UserList;
