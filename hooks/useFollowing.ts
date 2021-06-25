import { gql } from 'apollo-boost';
import { oc } from 'ts-optchain';
import { useQuery } from '@apollo/react-hooks';

interface IResponse {
  currentUser: {
    following: Array<{
      id: number;
      firstName: string;
      lastName: string;
      country: string;
      city: string;
    }>;
  };
}

const FOLLOWING_REQUEST = gql`
  query Following {
    currentUser {
      id
      following {
        id
        firstName
        lastName
        country
        city
      }
    }
  }
`;

export default function useFollowing(): [
  IResponse['currentUser']['following'] | undefined,
  boolean,
  Error | undefined
] {
  const { data, loading, error } = useQuery<IResponse>(FOLLOWING_REQUEST, {
    fetchPolicy: 'cache-and-network'
  });
  return [data && oc(data).currentUser.following([]), loading, error];
}
