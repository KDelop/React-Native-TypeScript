import * as React from 'react';
import {Observable, Observer} from 'rxjs';
import {gql, NetworkStatus, useQuery} from '@apollo/client';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import {Data, IChat} from '../types';
import {UserContext} from '../components/UserProvider';

export const createChatListObservable = (userId: string) =>
  new Observable(
    (observer: Observer<FirebaseFirestoreTypes.QuerySnapshot<IChat>>) => {
      const sub = firestore()
        .collection<IChat>('chatRooms')
        .where(new firestore.FieldPath('memberIds', userId), '==', true)
        .onSnapshot(
          (x) => observer.next(x),
          (e) => observer.error(e),
        );

      return () => sub();
    },
  );

const CHATS_QUERY = gql`
  query Chats {
    chats {
      nodes {
        id
        members {
          id
          firstName
          lastName
        }
        createdAt
        hasUnreadMessages
        lastMessage {
          id
          sentAt
          sentBy {
            id
            firstName
            lastName
          }
          text
        }
      }
    }
  }
`;

const useChats = (): Data<ReadonlyArray<IChat>> => {
  const userContext = React.useContext(UserContext);
  const {error, data, networkStatus, refetch} = useQuery(CHATS_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  React.useEffect(() => {
    if (!userContext.user) {
      return;
    }

    const sub = createChatListObservable(userContext.user.uid).subscribe(
      (x) => {
        refetch();
      },
    );

    return () => sub.unsubscribe();
  }, [userContext?.user?.uid]);

  if (error) {
    return {
      status: 'error',
      data: error,
    };
  }

  if (networkStatus === NetworkStatus.loading) {
    return {
      status: 'loading',
      data: null,
    };
  }

  return {
    status: 'success',
    data: data?.chats?.nodes,
  };
};

export default useChats;
