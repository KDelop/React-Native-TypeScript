import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import { Query } from '../types/graphql';

const CURRENT_USER_REQUEST = gql`
  query CurrentUser {
    currentUser {
      id
      name
    }
  }
`;

type Response = { currentUser?: Query['currentUser'] };

export default function useCurrentUser() {
  const { data, loading, error } = useQuery<Response>(CURRENT_USER_REQUEST, {
    fetchPolicy: 'cache-and-network'
  });
  return [error, loading, data?.currentUser] as const;
}
