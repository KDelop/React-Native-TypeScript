import _ from 'lodash';

import db from '../../dbConnection';
import { keysToSnakeCase, keysToCamelCase } from '../utils';
import fetchUser from '../query/fetchUser';

interface IUserTeam {
  fromUserId: string;
  toUserId: string;
}

const insertUserTeam = async (userTeam: IUserTeam) => {
  await db('user_team').insert(keysToSnakeCase(userTeam));
  const user = await fetchUser(userTeam.fromUserId);
  return keysToCamelCase({
    ...user,
    teammateStatus: 'REQUEST_SENT'
  });
};

export default insertUserTeam;
