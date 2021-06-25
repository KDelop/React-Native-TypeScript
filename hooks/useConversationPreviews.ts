import * as React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import useEvents from './useEvents';

interface IResponse {
  currentUser: {
    id: number;
    conversations: Array<{
      id: number;
      participants: Array<{ id: number; firstName: string; lastName: string }>;
      lastMessage: {
        sender: {
          id: number;
        };
        message: string;
        createdAt: string;
      };
    }>;
  };
}

const CONVERSATIONS = gql`
  query ConversationPreview {
    currentUser {
      id
      conversations {
        id
        participants {
          id
          firstName
          lastName
        }
        lastMessage {
          sender {
            id
          }
          message
          createdAt
        }
      }
    }
  }
`;

export default function useConversationPreviews(): [
  IResponse['currentUser'] | undefined,
  boolean,
  Error | undefined
] {
  const events = useEvents();
  const { data, loading, error, refetch } = useQuery<IResponse>(CONVERSATIONS, {
    fetchPolicy: 'network-only'
  });

  React.useEffect(() => {
    const subscription = events.subscribe(() => refetch());
    return () => subscription.unsubscribe();
  }, []);

  return [data && data.currentUser, loading, error];
}
