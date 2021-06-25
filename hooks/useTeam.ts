import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import { Query } from '../types/graphql';

const ALL_TEAMMATES = gql`
  query AllUsers {
    allTeammates {
      nextOffset
      users {
        id
        name
        teammateStatus
      }
    }
  }
`;

type Response = { allTeammates?: Query['allTeammates'] };

export default function useTeam() {
  const { data, loading, networkStatus, error, refetch } = useQuery<Response>(
    ALL_TEAMMATES,
    {
      fetchPolicy: 'cache-and-network'
    }
  );

  // Change users to teammates in schema for consistency...
  return [error, loading, data?.allTeammates?.users ?? [], refetch] as const;
}
