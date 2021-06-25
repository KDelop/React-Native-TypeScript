import * as React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Text, StyleSheet, FlatList } from 'react-native';

import AppContainer from './AppContainer';
import useUsers from '../hooks/useUsers';
import ListViewHeader from './ListViewHeader';
import ListItem from './ListItem';
import UserAvatar from './UserAvatar';
import { BRAND_BLUE, MEDIUM_GREY } from '../constants/colors';
import UserSummaryModal from './UserSummaryModal';
import { User, Maybe } from '../types/graphql';

const filterByName = (searchTerm: string) => (x: any) => {
  const lowerSearchTerm = searchTerm.toLowerCase();
  return x?.name?.toLowerCase()?.includes(lowerSearchTerm);
};

const ExploreView: React.SFC = () => {
  const [error, loading, users, reloadUsers] = useUsers();
  const [userSummaryOpen, setUserSummaryOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<Maybe<User>>();
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleModalRequestClose = React.useCallback(
    () => setUserSummaryOpen(false),
    []
  );

  const handleModalAnimationEnd = React.useCallback(
    () => setSelectedUser(undefined),
    []
  );

  return (
    <AppContainer>
      <ListViewHeader
        title="Explore"
        searchInputProps={{ onChangeText: setSearchTerm }}
      />
      <FlatList
        keyExtractor={x => x?.id ?? ''}
        contentContainerStyle={styles.listContainer}
        data={users?.filter(filterByName(searchTerm)) ?? []}
        renderItem={({ item }) => (
          <ListItem
            onPress={() => {
              setSelectedUser(item);
              setUserSummaryOpen(true);
            }}
            rightAdornment={
              item?.teammateStatus === 'NONE' && (
                <FeatherIcon name="plus" color={BRAND_BLUE} size={22} />
              )
            }
            leftAdornment={
              <UserAvatar userId={item?.id} loading={false} size="medium" />
            }
            content={
              <>
                <Text style={styles.listItemTitle}>{item?.name}</Text>
                <Text style={styles.listItemSecondaryText}>DPT, CSCS</Text>
                <Text style={styles.listItemSecondaryText}>Boston, MA</Text>
              </>
            }
          />
        )}
      />
      <UserSummaryModal
        userId={selectedUser?.id}
        open={userSummaryOpen}
        onRequestClose={handleModalRequestClose}
        onAnimationEnd={handleModalAnimationEnd}
        isPro={selectedUser?.isPro}
        name={selectedUser?.name}
        teammateStatus={selectedUser?.teammateStatus}
        onAddToTeamSuccess={reloadUsers}
      />
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginLeft: '5%',
    marginRight: '5%'
  },
  listItemSecondaryText: {
    fontFamily: 'Montserrat',
    color: MEDIUM_GREY,
    fontSize: 12,
    paddingTop: 2
  },
  listItemTitle: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: '700'
  }
});

export default ExploreView;
