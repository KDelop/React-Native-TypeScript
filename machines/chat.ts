import {gql} from '@apollo/client';
import {
  GiftedChat,
  IMessage as IGiftedChatMessage,
} from 'react-native-gifted-chat';
import {createMachine, assign} from 'xstate';

import {client} from '../apollo/config';
import {IMessage} from '../types';

interface IContext {
  chatId: string | null;
  cursor: string | null;
  memberIds: Array<string>;
  messages: Array<IGiftedChatMessage>;
}

const updateOptimistic = (
  messages: Array<IGiftedChatMessage>,
  optimisticId: string,
  newMessageId: string,
) => {
  const result = [];
  for (const message of messages) {
    result.push(
      message._id === optimisticId
        ? {...message, _id: newMessageId, sent: true}
        : message,
    );
  }
  return result;
};

const mapMessage = (x: IMessage) => ({
  _id: x.id,
  createdAt: new Date(parseInt(x.sentAt)),
  text: x.text,
  sent: true,
  user: {
    _id: x.sentBy?.id,
  },
});

const SEND_MESSAGE_MUTATION = gql`
  mutation SendChatMessageMutation(
    $text: String!
    $recipients: [GenericParticipantInput]!
  ) {
    sendChatMessage(text: $text, recipients: $recipients) {
      chatId
      id
    }
  }
`;

const CHAT_BY_MEMBER_IDS = gql`
  query ChatByMemberIds($memberIds: [String]!) {
    chatByMemberIds(memberIds: $memberIds) {
      id
      members {
        firstName
        lastName
      }
    }
  }
`;

const CHAT_MESSAGES_QUERY = gql`
  query ChatMessages(
    $chatId: String!
    $startAfter: String
    $startBefore: String
  ) {
    chatMessages(
      chatId: $chatId
      startAfter: $startAfter
      startBefore: $startBefore
    ) {
      nextCursor
      nodes {
        id
        sentAt
        text
        sentBy {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

const fetchChatMessages = async (
  chatId: string,
  startAfter?: string,
  startBefore?: string,
) => {
  const result = await client.query({
    query: CHAT_MESSAGES_QUERY,
    fetchPolicy: 'network-only',
    variables: {
      chatId,
      startAfter,
      startBefore,
    },
  });

  return result?.data?.chatMessages;
};

const chatMachine = createMachine<IContext>(
  {
    id: 'chat',
    context: {
      chatId: null,
      cursor: null,
      memberIds: [],
      messages: [],
    },
    type: 'parallel',
    states: {
      incoming: {
        initial: 'init',
        states: {
          init: {
            always: [
              {
                target: 'fetchChatId',
                cond: 'isMissingChatId',
              },
              {
                target: 'waitingForIncomingMessages',
              },
            ],
          },
          fetchChatId: {
            invoke: {
              src: 'fetchChatId',
              onDone: [
                {
                  target: 'newChat',
                  cond: 'chatNotFound',
                },
                {
                  target: 'waitingForIncomingMessages',
                  actions: 'setChatId',
                },
              ],
              onError: {
                target: '..failure',
              },
            },
          },
          newChat: {
            on: {
              SEND: {
                target: 'waitingForIncomingMessages',
              },
            },
          },
          waitingForIncomingMessages: {
            on: {
              LOAD_MORE: {
                target: 'fetchingPreviousMessages',
              },
              FETCH: {
                target: 'fetchingMessages',
                cond: 'lastMessageSent',
              },
            },
          },
          fetchingPreviousMessages: {
            invoke: {
              src: 'fetchPreviousMessages',
              onDone: {
                target: 'waitingForIncomingMessages',
                actions: 'prependMessages',
              },
              onError: {
                target: '..failure',
              },
            },
          },
          fetchingMessages: {
            invoke: {
              src: 'fetchMessages',
              onDone: {
                target: 'waitingForIncomingMessages',
                actions: 'appendMessages',
              },
              onError: {
                target: '..failure',
              },
            },
          },
        },
      },
      outgoing: {
        initial: 'waitForInput',
        states: {
          waitForInput: {
            on: {
              SEND: {
                target: 'sending',
                actions: 'setOptimistic',
              },
            },
          },
          sending: {
            invoke: {
              src: 'sendMessage',
              onDone: {
                target: 'sent',
                actions: 'updateOptimistic',
              },
              onError: {
                target: '..failure',
              },
            },
          },
          sent: {
            // TODO: Keeping this for if we have something we would like to do when the message is sent
            always: {
              target: 'waitForInput',
            },
          },
        },
      },
      failure: {
        // TODO: Eventually this should handle retries
      },
    },
  },
  {
    actions: {
      prependMessages: assign((ctx, event) => ({
        cursor: event.data?.nextCursor,
        messages: GiftedChat.prepend(
          ctx.messages,
          event.data?.nodes?.map?.(mapMessage),
        ),
      })),
      appendMessages: assign((ctx, event) => ({
        cursor: ctx.cursor || event.data?.nextCursor,
        messages: GiftedChat.append(
          ctx.messages,
          event.data?.nodes?.map?.(mapMessage),
        ),
      })),
      setOptimistic: assign((ctx, event) => ({
        messages: GiftedChat.append(ctx.messages, [
          {
            _id: event.optimisticId,
            createdAt: new Date(),
            text: event?.text,
            user: {
              _id: event?.senderId,
            },
            sent: false,
          },
        ]),
      })),
      setChatId: assign((_, event) => ({
        chatId: event.data,
      })),
      updateOptimistic: assign((ctx, event) => ({
        chatId: event.data?.chatId,
        nextCursor: event.data?.messages?.nextCursor,
        messages: GiftedChat.append(
          updateOptimistic(
            ctx.messages,
            event.data?.optimisticId,
            event.data?.messageId,
          ),
          event.data?.messages?.nodes?.map?.(mapMessage),
        ),
      })),
    },
    services: {
      fetchMessages: async (ctx) => {
        if (!ctx.chatId) {
          throw new Error('chatId must be set to fetch messages.');
        }

        const lastMessage = ctx.messages?.[0];
        const startBefore = lastMessage?._id;
        const messages = await fetchChatMessages(
          ctx?.chatId,
          '',
          startBefore as string,
        );
        return messages;
      },
      fetchPreviousMessages: async (ctx) => {
        if (!ctx.chatId) {
          throw new Error('chatId must be set to fetch messages.');
        }

        if (ctx.cursor) {
          return fetchChatMessages(ctx?.chatId, ctx.cursor, '');
        }

        return {
          nextCursor: null,
          nodes: [],
        };
      },
      sendMessage: async (_, event) => {
        const message = await client.mutate({
          mutation: SEND_MESSAGE_MUTATION,
          variables: {
            text: event.text,
            recipients: event.recipients,
          },
        });

        const chatId = message.data?.sendChatMessage?.chatId;
        const messageId = message.data?.sendChatMessage?.id;
        const messages = await fetchChatMessages(chatId, '', messageId);

        return {
          chatId,
          messageId,
          optimisticId: event.optimisticId,
          messages,
        };
      },
      fetchChatId: async (ctx) => {
        const chat = await client.query({
          query: CHAT_BY_MEMBER_IDS,
          fetchPolicy: 'network-only',
          variables: {
            memberIds: ctx.memberIds,
          },
        });
        return chat.data.chatByMemberIds?.id ?? null;
      },
    },
    guards: {
      isMissingChatId: (ctx) => ctx.chatId === null,
      chatNotFound: (_, event) => event.data === null,
      lastMessageSent: (ctx) => ctx.messages?.[0]?.sent !== false,
    },
  },
);

export default chatMachine;
