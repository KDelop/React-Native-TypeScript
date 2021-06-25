import * as React from 'react';
import {Observable, Observer} from 'rxjs';
import {gql, NetworkStatus, useQuery} from '@apollo/client';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import {IStream, Data} from '../types';

export const createStreamListObservable = () =>
  new Observable(
    (observer: Observer<FirebaseFirestoreTypes.QuerySnapshot<IStream>>) => {
      const sub = firestore()
        .collection<IStream>('streams')
        .onSnapshot(
          (x) => observer.next(x),
          (e) => observer.error(e),
        );

      return () => sub();
    },
  );

const STREAMS_QUERY = gql`
  query Streams {
    streams {
      nodes {
        id
        title
        description
        startAt
        isInitiator
        initiatedBy {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

const useStreams = (): Data<ReadonlyArray<IStream>> => {
  const {error, data, networkStatus, refetch} = useQuery(STREAMS_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  React.useEffect(() => {
    const sub = createStreamListObservable().subscribe((x) => {
      refetch();
    });

    return () => sub.unsubscribe();
  }, []);

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
    data: data?.streams?.nodes,
  };
};

export default useStreams;
