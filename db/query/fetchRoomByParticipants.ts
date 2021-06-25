import _ from 'lodash';

import db from '../../dbConnection';
import { keysToCamelCase } from '../utils';

const fetchRoomByParticipants = async (
  userId: string,
  participants: Array<string>
) => {
  const uniqParticipants = _.uniq([...participants, userId]);

  const room = await db('room_user as ru')
    .select(['ru.room_id as id', 'ru_con.last_impression_at'])
    .joinRaw(
      'LEFT JOIN room_user AS ru_con ON ru.room_id = ru_con.room_id AND ru_con.user_id = ?',
      [userId]
    )
    .whereIn('ru.user_id', uniqParticipants)
    .whereNotIn('ru.room_id', (x) =>
      x
        .select('room_id')
        .from('room_user')
        .whereNotIn('user_id', uniqParticipants)
    )
    .groupBy('ru.room_id', 'ru_con.last_impression_at')
    .having(db.raw('count(*)'), '=', uniqParticipants.length)
    .first();

  return room ? keysToCamelCase(room) : null;
};

export default fetchRoomByParticipants;
