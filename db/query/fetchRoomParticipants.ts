import _ from 'lodash';

import db from '../../dbConnection';
import { keysToCamelCase } from '../utils';

const fetchRoomParticipants = async (roomId: string) => {
  const users = await db('room_user as ru')
    .select(['u.id', 'u.name', 'u.date_of_birth', 'u.last_login_at'])
    .joinRaw('JOIN "user" AS u ON u.id = ru.user_id')
    .where({ room_id: roomId });

  return users.map(keysToCamelCase);
};

export default fetchRoomParticipants;
