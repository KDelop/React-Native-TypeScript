import * as React from 'react';
import { gql } from 'apollo-boost';
import { useFocusEffect } from 'react-navigation-hooks';
import { useLazyQuery } from '@apollo/react-hooks';

import { Query } from '../types/graphql';

interface IRoom {
  id: number;
  lastImpressionAt: string;
  lastMessage: {
    body: string;
    createdAt: string;
  };
  participants: Array<{
    id: string;
    name: string;
  }>;
}

interface IResponse {
  allRooms: {
    rooms: Array<IRoom>;
  };
}

const ALL_PRIVATE_ROOMS = gql`
  query AllPrivateRooms {
    allRooms {
      rooms {
        id
        lastImpressionAt
        lastMessage {
          body
          createdAt
        }
        participants {
          id
          name
        }
      }
    }
  }
`;

type Response = { allRooms?: Query['allRooms'] };

export default function usePrivateRooms() {
  const [fetch, { data, loading, error }] = useLazyQuery<Response>(
    ALL_PRIVATE_ROOMS,
    {
      fetchPolicy: 'cache-and-network'
    }
  );

  useFocusEffect(
    React.useCallback(() => {
      fetch && fetch();
    }, [fetch])
  );

  return [error, loading, data?.allRooms?.rooms ?? [], fetch] as const;
}
