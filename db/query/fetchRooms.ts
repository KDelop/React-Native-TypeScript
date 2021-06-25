import _ from 'lodash';

import db from '../../dbConnection';
import { getNextOffset, keysToCamelCase } from '../utils';

const fetchRooms = async (userId: string, limit = 50, offset = 0) => {
  const rooms = await db('room_user as r')
    .select(['room_id as id', 'last_impression_at'])
    .where({ user_id: userId })
    .limit(limit + 1)
    .offset(offset);

  return {
    nextOffset: getNextOffset(rooms, offset, limit),
    rooms: rooms.map(keysToCamelCase).slice(0, limit)
  };
};

export default fetchRooms;
