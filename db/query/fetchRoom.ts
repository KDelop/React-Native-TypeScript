import _ from 'lodash';

import db from '../../dbConnection';
import { keysToCamelCase } from '../utils';

const fetchRoom = async (userId: string, roomId: string) => {
  const room = await db('room_user as r')
    .select(['room_id as id', 'last_impression_at'])
    .where({ user_id: userId })
    .andWhere({ room_id: roomId })
    .first();

  return room ? keysToCamelCase(room) : null;
};

export default fetchRoom;
