import * as React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import useCurrentUser from '../hooks/useCurrentUser';
import Typography from './designSystem/Typography';
import ListItem from './designSystem/ListItem';
import UserAvatar from './UserAvatar';
import NiceTime from './designSystem/NiceTime';
import ListViewHeader from './designSystem/ListViewHeader';
import {IChat} from '../types';
import ListPlaceholder from './designSystem/ListPlaceholder';
import NotificationBubble from './designSystem/NotificationBubble';
import Padded from './designSystem/Padded';
import {BRAND_BLUE} from './colors';
import useChats from '../hooks/useChats';
import {ellipsisText} from './textUtil';

const ChatListView = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const chats = useChats();
  const {navigate} = useNavigation();

  const filterUsers = (searchTerm: string) => (chatListItem: IChat) =>
    chatListItem.members.some((x) => {
      const term = `${x.firstName} ${x.lastName} ${chatListItem.lastMessage.text}`.toLowerCase();
      return term.includes(searchTerm.toLowerCase());
    });

  return (
    <>
      <ListViewHeader
        showBackButton={false}
        title="Messages"
        rightAdornment={
          <TouchableOpacity
            onPress={() => navigate('NewChat')}
            delayPressIn={0}>
            <FeatherIcon name="edit" size={20} color={BRAND_BLUE} />
          </TouchableOpacity>
        }
        searchInputProps={{onChangeText: setSearchTerm}}
      />
      <FlatList
        style={styles.list}
        data={
          chats.status === 'success'
            ? chats.data.filter(filterUsers(searchTerm))
            : []
        }
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={() => {
          if (chats.status === 'loading') {
            return <ListPlaceholder.Loading />;
          }

          if (
            searchTerm &&
            chats.status === 'success' &&
            chats.data.length > 0
          ) {
            return <ListPlaceholder.NoSearchResults searchTerm={searchTerm} />;
          }

          return null;
        }}
        renderItem={({item, index}) => {
          const lastMessage = item.lastMessage;
          return (
            <ListItem
              showDivider={
                chats.status === 'success' && index < chats.data.length - 1
              }
              onPress={() => navigate('Chat', {chatId: item.id})}
              leftAdornment={
                <UserAvatar diameter={50} userId={item.members[0].id} />
              }
              rightAdornment={
                item.hasUnreadMessages && (
                  <Padded size={4}>
                    <NotificationBubble />
                  </Padded>
                )
              }
              content={
                <>
                  <Typography variant="listItemPrimary">
                    {item.members
                      .map((x) => `${x.firstName} ${x.lastName}`)
                      .join(', ')}
                  </Typography>
                  <Typography>{ellipsisText(60, lastMessage?.text)}</Typography>
                  <Typography variant="listItemTertiary">
                    <NiceTime date={parseInt(lastMessage?.sentAt)} />
                  </Typography>
                </>
              }
            />
          );
        }}
      />
    </>
  );
};

export const styles = StyleSheet.create({
  list: {
    paddingTop: 12,
  },
  listContentContainer: {
    paddingBottom: 12,
  },
});

export default ChatListView;
