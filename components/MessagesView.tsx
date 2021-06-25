import * as React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import Maybe from 'graphql/tsutils/Maybe';

import AppContainer from './AppContainer';
import ListViewHeader from './ListViewHeader';
import { MEDIUM_GREY, BRAND_BLUE } from '../constants/colors';
import ListItem from './ListItem';
import UserAvatar from './UserAvatar';
import usePrivateRooms from '../hooks/usePrivateRooms';
import useCurrentUser from '../hooks/useCurrentUser';
import TeamListModal from './TeamListModal';

const shortenLastMessage = (message?: Maybe<string>) =>
  message && message.length > 60 ? `${message.substr(0, 60)}...` : message;

const MessagesView: React.SFC = () => {
  const { navigate } = useNavigation();
  const [openModal, setModalOpen] = React.useState(false);
  const [prError, prLoading, rooms] = usePrivateRooms();
  const [cuError, cuLoading, currentUser] = useCurrentUser();

  const openMessageView = React.useCallback((userId: string) => {
    navigate('Message', { participants: [userId] });
  }, []);

  return (
    <AppContainer>
      <ListViewHeader
        title="Messages"
        rightAdornment={
          <TouchableOpacity onPress={() => setModalOpen(true)}>
            <MaterialIcon name="pencil-plus" size={24} color={BRAND_BLUE} />
          </TouchableOpacity>
        }
      />
      <FlatList
        keyExtractor={x => x?.id ?? ''}
        contentContainerStyle={styles.listContainer}
        data={rooms}
        renderItem={({ item }) => {
          const participants =
            item?.participants?.filter(x => x?.id !== currentUser?.id) ?? [];

          // Change this when group chat is available
          const participant = participants?.[0];

          return (
            <ListItem
              onPress={() => {
                navigate('Message', { roomId: item?.id });
              }}
              leftAdornment={
                <UserAvatar
                  userId={participant?.id}
                  loading={false}
                  size="medium"
                />
              }
              content={
                <>
                  <Text style={styles.listItemTitle}>{participant?.name}</Text>
                  <Text style={styles.listItemSecondaryText}>
                    {shortenLastMessage(item?.lastMessage?.body)}
                  </Text>
                </>
              }
            />
          );
        }}
      />
      <TeamListModal
        open={openModal}
        onRequestClose={() => setModalOpen(false)}
        onTeamMemberClick={openMessageView}
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
    fontSize: 14,
    paddingTop: 2,
    overflow: 'hidden'
  },
  listItemTitle: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: '700'
  }
});

export default MessagesView;
