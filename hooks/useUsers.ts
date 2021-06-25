import {gql, NetworkStatus, useQuery} from '@apollo/client';

import {IUser, Data} from '../types';

const EXPLORE_QUERY = gql`
  query Explore {
    users {
      nodes {
        id
        firstName
        lastName
        city
        state
        isPro
      }
    }
  }
`;

const useUsers = (): Data<ReadonlyArray<IUser>> => {
  const {networkStatus, error, data, refetch} = useQuery(EXPLORE_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  if (error) {
    return {
      status: 'error',
      data: error,
      refetch,
    };
  }

  if (networkStatus === NetworkStatus.loading) {
    return {
      status: 'loading',
      data: null,
      refetch,
    };
  }

  return {
    status: 'success',
    data: data?.users?.nodes,
    refetch,
  };
};

export default useUsers;
