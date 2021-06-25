import * as React from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import { MutationInviteToTeamArgs, Mutation } from '../types/graphql';

const ALL_USERS = gql`
  mutation InviteToTeam($toUserId: ID!) {
    inviteToTeam(toUserId: $toUserId) {
      id
    }
  }
`;

type Response = { inviteToTeam?: Mutation['inviteToTeam'] };

export default function useInviteToTeam() {
  const [mutate, { data, loading, error }] = useMutation<
    Response,
    MutationInviteToTeamArgs
  >(ALL_USERS);

  const inviteToTeam = React.useCallback(
    (toUserId: string) =>
      mutate({
        variables: {
          toUserId
        }
      }),
    [mutate]
  );

  return [error, loading, inviteToTeam, data?.inviteToTeam?.id] as const;
}
