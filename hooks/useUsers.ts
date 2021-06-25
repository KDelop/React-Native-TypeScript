import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import { Query } from '../types/graphql';

const ALL_USERS = gql`
  query AllUsers {
    allUsers {
      nextOffset
      users {
        id
        name
        teammateStatus
      }
    }
  }
`;

type Response = { allUsers?: Query['allUsers'] };

export default function useFollowing() {
  const { data, loading, error, refetch } = useQuery<Response>(ALL_USERS, {
    fetchPolicy: 'cache-and-network'
  });

  return [error, loading, data?.allUsers?.users ?? [], refetch] as const;
}
