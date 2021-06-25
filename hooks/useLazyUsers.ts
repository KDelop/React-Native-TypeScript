import * as React from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

interface IResponse {
  users: Array<{
    id: number;
    firstName: string;
    lastName: string;
  }>;
}

const LOGIN_REQUEST = gql`
  query User($ids: [Int!]) {
    users(ids: $ids) {
      id
      firstName
      lastName
    }
  }
`;

const useLazyUsers = (): [
  typeof getUsers,
  IResponse['users'] | undefined,
  boolean,
  Error | undefined
] => {
  const [getUsers, { data, loading, error }] = useLazyQuery<IResponse>(
    LOGIN_REQUEST,
    {
      fetchPolicy: 'cache-and-network'
    }
  );

  return [getUsers, data && data.users, loading, error];
};

export default useLazyUsers;
