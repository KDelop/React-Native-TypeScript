import * as React from 'react';
import {useMachine} from '@xstate/react';
import {useRoute, RouteProp} from '@react-navigation/native';
import {Bubble, GiftedChat, IMessage, Message} from 'react-native-gifted-chat';
import {uniqueId} from 'xstate/lib/utils';
import {Observable, Observer, Subject} from 'rxjs';
import {filter, mergeMap, take} from 'rxjs/operators';
import {DotIndicator} from 'react-native-indicators';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import {IChatRoom, RootStackParamList} from '../types';
import useChatRoom from '../hooks/useChatRoom';
import UserAvatar from './UserAvatar';
import {BRAND_BLUE, LIGHT_GREY, MESSAGE_BUBBLE_GREY} from './colors';
import Padded from './designSystem/Padded';
import ChatViewHeader from './ChatViewHeader';
import chatMachine from '../machines/chat';
import {UserContext} from './UserProvider';
import ListPlaceholder from './designSystem/ListPlaceholder';
import {View} from 'react-native';

const getUsersName = (
  members: IChatRoom['members'] | undefined,
  userId: string,
) => {
  const member = members?.[userId];
  return `${member?.firstName} ${member?.lastName}`;
};

const getRecipientUserData = (
  members: IChatRoom['members'] | undefined,
  currentUserId: string,
) => {
  if (!members) {
    return [];
  }

  return Object.entries(members).filter(([key]) => key !== currentUserId)?.[0];
};

export const createChatMessageObservable = (chatId: string) =>
  new Observable(
    (observer: Observer<FirebaseFirestoreTypes.QuerySnapshot<IMessage>>) => {
      const sub = firestore()
        .collection('chatRooms')
        .doc(chatId)
        .collection('messages')
        .orderBy('sentAt', 'desc')
        .limit(5)
        .onSnapshot(
          (x) => observer.next(x as any),
          (e) => observer.error(e),
        );

      return () => sub();
    },
  );

const ChatView = () => {
  const userContext = React.useContext(UserContext);
  const subject = React.useRef(new Subject<string | null>()).current;
  const {params} = useRoute<RouteProp<RootStackParamList, 'Chat'>>();
  const [state, dispatch] = useMachine(chatMachine, {
    context: {
      chatId: params.chatId || null,
      memberIds: Object.keys(params.members ?? {}) ?? [],
    },
  });
  const chatId = state.context.chatId;
  const chatRoomResponse = useChatRoom(state.context.chatId ?? undefined);
  const chatRoomMembers =
    chatRoomResponse.status === 'success'
      ? chatRoomResponse?.data?.members || params?.members
      : params?.members;

  React.useEffect(() => {
    const sub = subject
      .pipe(
        filter((x): x is string => typeof x === 'string' && Boolean(x)),
        take(1),
        mergeMap(createChatMessageObservable),
      )
      .subscribe((x) => dispatch('FETCH'));

    return () => sub.unsubscribe();
  }, []);

  React.useEffect(() => {
    subject.next(chatId);
  }, [chatId]);

  const [recipientUserId, recipientName] = getRecipientUserData(
    chatRoomMembers,
    userContext.user?.uid as string,
  );

  const messages =
    state.context.messages.map<IMessage>((x) => ({
      ...x,
      user: {
        _id: x.user._id,
        name: getUsersName(chatRoomMembers, String(x.user._id)),
        avatar: () => <UserAvatar userId={String(x.user._id)} diameter={36} />,
      },
    })) ?? [];

  return (
    <>
      <ChatViewHeader
        recipientUserId={recipientUserId}
        recipientName={recipientName}
        loading={!params?.members && chatRoomResponse.status !== 'success'}
      />
      <GiftedChat
        messages={messages}
        renderBubble={(props) => (
          <Bubble
            {...props}
            textStyle={{
              left: {fontFamily: 'Montserrat-Regular', fontSize: 13},
              right: {fontFamily: 'Montserrat-Regular', fontSize: 13},
            }}
            wrapperStyle={{
              left: {
                backgroundColor: MESSAGE_BUBBLE_GREY,
              },
              right: {
                backgroundColor: BRAND_BLUE,
              },
            }}
          />
        )}
        renderMessage={({position, ...rest}) => (
          <Padded size={position === 'left' ? {left: 5} : {right: 5}}>
            <Message
              position={position}
              {...rest}
              containerStyle={{
                left: {marginLeft: 0},
                right: {marginRight: 0},
              }}
            />
          </Padded>
        )}
        renderChatEmpty={() => (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {chatRoomResponse.status !== 'success' && (
              <DotIndicator size={4} color={LIGHT_GREY} />
            )}
            {state.matches({incoming: 'newChat'}) && (
              <ListPlaceholder.EmptyChat />
            )}
          </View>
        )}
        loadEarlier={state.context.cursor !== null}
        isLoadingEarlier={state.matches({incoming: 'fetchingPreviousMessages'})}
        onSend={(x) => {
          dispatch('SEND', {
            text: x[0].text,
            recipients: Object.entries(chatRoomMembers ?? {}).map(
              ([id, v]) => ({
                id,
                firstName: v.firstName,
                lastName: v.lastName,
              }),
            ),
            optimisticId: uniqueId(),
            senderId: userContext.user?.uid,
          });
        }}
        onLoadEarlier={() => dispatch('LOAD_MORE')}
        listViewProps={{
          inverted: messages.length > 0,
        }}
        user={{
          _id: userContext.user?.uid as string,
        }}
      />
    </>
  );
};

export default ChatView;
