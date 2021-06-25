import _ from 'lodash';

import db from '../../dbConnection';
import { keysToCamelCase } from '../utils';

const fetchLastMessage = async (roomId: string) => {
  const message = await db('room_message')
    .select(['id', 'body', 'created_at', 'user_id as sent_by_user_id'])
    .where({ room_id: roomId })
    .orderBy('created_at', 'desc')
    .limit(1)
    .first();

  return message ? keysToCamelCase(message) : null;
};

export default fetchLastMessage;
