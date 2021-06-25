import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

interface IResponse {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    city: string;
    stateProvince: string;
    country: string;
  };
}

const CURRENT_USER_REQUEST = gql`
  query User($userId: Int!) {
    user(id: $userId) {
      id
      firstName
      lastName
      city
      stateProvince
      country
    }
  }
`;

export default function useUser(
  userId?: number
): [IResponse['user'] | undefined, boolean, Error | undefined] {
  const { data, loading, error } = useQuery<IResponse>(CURRENT_USER_REQUEST, {
    fetchPolicy: 'cache-and-network',
    skip: userId === undefined,
    variables: { userId }
  });
  return [data && data.user, loading, error];
}
