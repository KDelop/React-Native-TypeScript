import * as React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

import UserAvatar from './UserAvatar';
import AppContainer from './AppContainer';
import { BRAND_BLUE } from '../constants/colors';
import useCurrentUser from '../hooks/useCurrentUser';
import usePrivateRoom from '../hooks/usePrivateRoom';

const MessageView = () => {
  const {
    state: {
      params: { roomId, participants }
    }
  } = useNavigation();
  const [cuError, cuLoading, currentUser] = useCurrentUser();
  const [
    rError,
    rLoading,
    room,
    messages,
    sendMessage,
    loadMoreMessages,
    canLoadEarlier
  ] = usePrivateRoom(roomId, participants);

  return (
    <AppContainer>
      <GiftedChat
        onSend={x => {
          const message = x?.[0];
          if (message) {
            sendMessage(message);
          }
        }}
        messages={messages}
        loadEarlier={canLoadEarlier}
        isLoadingEarlier={rLoading.roomMessagesLoading}
        onLoadEarlier={loadMoreMessages}
        messagesContainerStyle={{
          marginLeft: 8,
          marginRight: 8
        }}
        renderBubble={props => {
          return (
            <Bubble<any>
              {...props}
              wrapperStyle={{
                left: {},
                right: {
                  backgroundColor: BRAND_BLUE
                }
              }}
            />
          );
        }}
        renderAvatar={({ currentMessage }) => {
          return (
            <UserAvatar loading={false} userId={currentMessage?.user?._id} />
          );
        }}
        user={{
          _id: currentUser?.id ?? ''
        }}
      />
    </AppContainer>
  );
};

export default MessageView;
