import _ from 'lodash';

import db from '../../dbConnection';
import fetchUser from '../query/fetchUser';

interface IUserTeam {
  fromUserId: string;
  toUserId: string;
  accepted: boolean;
}

const updateUserTeam = async (userTeam: IUserTeam) => {
  const invitations = await db('user_team')
    .select()
    .where({
      from_user_id: userTeam.fromUserId
    })
    .andWhere({
      to_user_id: userTeam.toUserId
    });

  if (invitations.length === 0) {
    throw new Error('Team invitation not found.');
  }

  const op = userTeam.accepted
    ? db('user_team').update({ pending: false })
    : db('user_team').delete();

  const count = await op
    .where({
      from_user_id: userTeam.fromUserId
    })
    .andWhere({
      to_user_id: userTeam.toUserId
    })
    .andWhere({
      pending: true
    });

  if (count === 0) {
    throw new Error('Cannot update invitation.');
  }

  const user = await fetchUser(userTeam.fromUserId);
  return {
    ...user,
    teammateStatus: userTeam.accepted ? 'TEAMMATES' : 'NONE'
  };
};

export default updateUserTeam;
