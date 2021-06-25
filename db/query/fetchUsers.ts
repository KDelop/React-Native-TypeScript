import _ from 'lodash';

import db from '../../dbConnection';
import { keysToCamelCase, getNextOffset } from '../utils';

const fetchUsers = async (id: string, limit = 50, offset = 0) => {
  const users = await db('user as u')
    .select([
      'u.id',
      'u.name',
      'u.last_login_at',
      'u.date_of_birth',
      db.raw(
        `
          CASE
            WHEN ut.pending = FALSE THEN 'TEAMMATES'
            WHEN ut.from_user_id = ? THEN 'REQUEST_SENT'
            WHEN ut.to_user_id = ? THEN 'REQUEST_RECEIVED'
            ELSE 'NONE'
          END AS teammate_status
        `,
        [id, id]
      )
    ])
    .joinRaw(
      `
        LEFT JOIN user_team AS ut ON
          (ut.from_user_id = ? AND ut.to_user_id = u.id) OR
          (ut.from_user_id = u.id AND ut.to_user_id = ?)
    `,
      [id, id]
    )
    .whereNot({
      id
    })
    .limit(limit + 1)
    .offset(offset);

  return {
    nextOffset: getNextOffset(users, offset, limit),
    users: users.map(keysToCamelCase).slice(0, limit)
  };
};

export default fetchUsers;
