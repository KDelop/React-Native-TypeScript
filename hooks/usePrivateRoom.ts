import _ from 'lodash';
import * as React from 'react';
import { Subject, iif } from 'rxjs';
import { gql } from 'apollo-boost';
import { GraphQLError } from 'graphql';
import { flatMap, tap, last } from 'rxjs/operators';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useQuery, useApolloClient, useMutation } from '@apollo/react-hooks';
import { parseISO } from 'date-fns';

import {
  Query,
  Room,
  Maybe,
  BasicUser,
  MessagePage,
  Mutation
} from '../types/graphql';

const ROOM_INNER_QUERY = `
  id
  participants {
    id
    name
  }
  lastImpressionAt
`;

const ROOM_BY_ID = gql`
  query PrivateRoomById($roomId: ID!) {
    room(roomId: $roomId) {
      ${ROOM_INNER_QUERY}
    }
  }
`;

const ROOM_BY_PARTICIPANTS = gql`
  query PrivateRoomByParticipants($participants: [ID!]) {
    roomByParticipants(participants: $participants) {
      ${ROOM_INNER_QUERY}
    }
  }
`;

const ROOM_MESSAGES = gql`
  query PrivateRoomMessages($roomId: ID!, $before: ID) {
    allMessages(roomId: $roomId, before: $before) {
      nextOffset
      messages {
        id
        body
        sentByUserId
        createdAt
      }
    }
  }
`;

const CREATE_ROOM = gql`
  mutation InitPrivateRoom($participants: [ID!], $firstMessageBody: String!) {
    createRoom(
      participants: $participants
      firstMessageBody: $firstMessageBody
    ) {
      id
      lastMessage {
        id
      }
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation SendMessage($roomId: ID!, $body: String!) {
    sendMessage(roomId: $roomId, body: $body) {
      id
      body
      createdAt
      sentByUserId
    }
  }
`;

type ResponseById = { room: Query['room'] };

type ResponseByParticipants = {
  roomByParticipants: Query['roomByParticipants'];
};

type ResponseMessages = {
  allMessages?: Query['allMessages'];
};

type ResponseSendMessage = {
  sendMessage?: Mutation['sendMessage'];
};

type ResponseCreateRoom = {
  createRoom?: Mutation['createRoom'];
};

const mapMessages = (messages: MessagePage['messages']): Array<IMessage> =>
  messages?.map(x => ({
    _id: x?.id ?? '',
    text: x?.body ?? '',
    createdAt: parseISO(x?.createdAt ?? ''),
    sent: true,
    user: {
      _id: x?.sentByUserId ?? ''
    }
  })) ?? [];

const createParticipantMap = (participants?: Room['participants']) =>
  participants?.reduce(
    (acc, x) =>
      x?.id
        ? {
            ...acc,
            [x.id]: x
          }
        : acc,

    {} as Record<string, Maybe<BasicUser>>
  );

const mapRooms = (data?: Maybe<Room>) =>
  data
    ? {
        ...data,
        participants: createParticipantMap(data?.participants)
      }
    : data;

export default function usePrivateRoom(
  roomId?: string,
  participants?: Array<string>
) {
  const client = useApolloClient();
  const fetchMessagesSub = React.useRef(
    new Subject<{ roomId: string; before?: string }>()
  );
  const sendMessageSub = React.useRef(new Subject<IMessage>());
  const createRoomSub = React.useRef(new Subject<IMessage>());
  const [resolvedRoomId, setResolvedRoomId] = React.useState<
    Maybe<string> | undefined
  >(roomId);
  const [canLoadMoreMessages, setCanLoadMoreMessages] = React.useState(false);
  const [roomMessagesLoading, setRoomMessagesLoading] = React.useState(false);
  const [roomMessagesData, setRoomMessagesData] = React.useState<
    Array<IMessage>
  >([]);
  const [roomMessagesError, setRoomMessagesError] = React.useState<
    ReadonlyArray<GraphQLError>
  >();

  const [createRoom] = useMutation<ResponseCreateRoom>(CREATE_ROOM);
  const [sendMessage] = useMutation<ResponseSendMessage>(SEND_MESSAGE);

  const {
    data: roomByIdData,
    loading: roomByIdLoading,
    error: roomByIdError
  } = useQuery<ResponseById>(ROOM_BY_ID, {
    fetchPolicy: 'cache-and-network',
    skip: roomId === undefined || !!participants,
    variables: {
      roomId: roomId
    }
  });

  const {
    data: roomByParticipantsData,
    loading: roomByParticipantsLoading,
    error: roomByParticipantsError,
    refetch
  } = useQuery<ResponseByParticipants>(ROOM_BY_PARTICIPANTS, {
    fetchPolicy: 'cache-and-network',
    skip: !participants || roomId !== undefined,
    onCompleted: x => setResolvedRoomId(x?.roomByParticipants?.id),
    variables: {
      participants
    }
  });

  React.useEffect(() => {
    const sub = fetchMessagesSub.current
      .pipe(
        tap(() => setRoomMessagesLoading(true)),
        flatMap(async args => ({
          args,
          response: await client.query<ResponseMessages>({
            query: ROOM_MESSAGES,
            fetchPolicy: 'no-cache',
            variables: {
              roomId: args.roomId,
              before: args.before
            }
          })
        })),
        tap(x => {
          const response = x.response;
          setCanLoadMoreMessages(
            (response.data.allMessages?.nextOffset ?? -1) > 0
          );
          setRoomMessagesError(response.errors);
          setRoomMessagesLoading(false);
          setRoomMessagesData(messages =>
            _.uniqBy(
              x.args.before === undefined
                ? GiftedChat.append(
                    messages,
                    mapMessages(response.data?.allMessages?.messages)
                  )
                : GiftedChat.prepend(
                    messages,
                    mapMessages(response.data?.allMessages?.messages)
                  ),
              x => x._id
            )
          );
        })
      )
      .subscribe();

    if (resolvedRoomId) {
      fetchMessagesSub.current.next({ roomId: resolvedRoomId });
    }

    return () => sub.unsubscribe();
  }, [resolvedRoomId]);

  React.useEffect(() => {
    const sub = sendMessageSub.current
      .pipe(
        tap(message =>
          setRoomMessagesData(messages =>
            GiftedChat.append(messages, [{ ...message, sent: false }])
          )
        ),
        flatMap(async message => ({
          message,
          response: await sendMessage({
            variables: {
              roomId: resolvedRoomId,
              body: message.text
            }
          })
        })),
        tap(x => {
          setRoomMessagesData(messages => {
            const idx = _.findIndex(messages, { _id: x.message._id });
            const newMessage = {
              ...messages[idx],
              _id: x.response.data?.sendMessage?.id,
              sent: true
            };
            return [
              ...messages.slice(0, idx),
              newMessage,
              ...messages.slice(idx + 1)
            ];
          });
        })
      )
      .subscribe();

    return () => sub.unsubscribe();
  }, [sendMessage, resolvedRoomId]);

  React.useEffect(() => {
    const sub = createRoomSub.current
      .pipe(
        tap(message =>
          setRoomMessagesData(messages =>
            GiftedChat.append(messages, [message])
          )
        ),
        flatMap(async message => ({
          message,
          response: await createRoom({
            variables: {
              participants,
              firstMessageBody: message.text
            }
          })
        })),
        tap(x => {
          setRoomMessagesData(messages => {
            const idx = _.findIndex(messages, { _id: x.message._id });
            const newMessage = {
              ...messages[idx],
              _id: x.response.data?.createRoom?.lastMessage?.id,
              sent: true
            };
            return [
              ...messages.slice(0, idx),
              newMessage,
              ...messages.slice(idx + 1)
            ];
          });
          setResolvedRoomId(x.response?.data?.createRoom?.id);
        })
      )
      .subscribe();

    return () => sub.unsubscribe();
  }, [refetch, createRoom, participants]);

  const sendMessageFn = React.useCallback(
    (x: IMessage) => {
      if (resolvedRoomId) {
        sendMessageSub.current.next(x);
      } else {
        createRoomSub.current.next(x);
      }
    },
    [resolvedRoomId]
  );

  const loadMoreMessages = React.useCallback(() => {
    const lastId = _.last(roomMessagesData)?._id;
    if (resolvedRoomId && typeof lastId === 'string' && canLoadMoreMessages) {
      fetchMessagesSub.current.next({ roomId: resolvedRoomId, before: lastId });
    }
  }, [roomMessagesData, resolvedRoomId, canLoadMoreMessages]);

  return [
    { roomByIdError, roomByParticipantsError, roomMessagesError },
    { roomByIdLoading, roomByParticipantsLoading, roomMessagesLoading },
    mapRooms(roomByIdData?.room || roomByParticipantsData?.roomByParticipants),
    roomMessagesData,
    sendMessageFn,
    loadMoreMessages,
    canLoadMoreMessages
  ] as const;
}
