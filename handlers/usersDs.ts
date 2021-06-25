import { Handler } from 'aws-lambda';
import 'source-map-support/register';
import 'cross-fetch/polyfill';

import fetchUser from '../db/query/fetchUser';
import fetchUsers from '../db/query/fetchUsers';
import insertUserTeam from '../db/mutation/insertUserTeam';
import updateUserTeam from '../db/mutation/updateUserTeam';
import fetchTeammates from '../db/query/fetchTeammates';

const usersDs: Handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    switch (event.field) {
      case 'currentUser':
        return callback(null, await fetchUser(event?.identity?.claims?.sub));
      case 'allTeammates':
        return callback(
          null,
          await fetchTeammates(
            event?.identity?.claims?.sub,
            event?.arguments?.pending,
            event?.arguments?.limit,
            event?.arguments?.offset
          )
        );
      case 'user':
        return callback(null, await fetchUser(event?.arguments?.userId));
      case 'allUsers':
        return callback(
          null,
          await fetchUsers(
            event?.identity?.claims?.sub,
            event?.arguments?.limit,
            event?.arguments?.offset
          )
        );
      case 'inviteToTeam':
        return callback(
          null,
          await insertUserTeam({
            toUserId: event?.arguments?.toUserId,
            fromUserId: event?.identity?.claims?.sub
          })
        );
      case 'updateTeamInvite':
        return callback(
          null,
          await updateUserTeam({
            fromUserId: event?.arguments?.fromUserId,
            toUserId: event?.identity?.claims?.sub,
            accepted: event?.arguments?.accepted
          })
        );
    }
  } catch (e) {
    console.log(e);
    return callback('Error while querying users', null);
  }
};

export default usersDs;
