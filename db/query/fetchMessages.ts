import _ from 'lodash';

import db from '../../dbConnection';
import { getNextOffset, keysToCamelCase } from '../utils';

const fetchMessages = async (
  userId: string,
  roomId: number,
  before: number = null,
  limit = 50,
  offset = 0
) => {
  const userRoom = await db('room_user')
    .select()
    .where({ user_id: userId })
    .andWhere({ room_id: roomId })
    .first();

  if (!userRoom) return null;

  const messagesQuery = db('room_message')
    .select(['*', 'user_id AS sent_by_user_id'])
    .where({ room_id: roomId })
    .orderBy('created_at', 'desc')
    .limit(limit + 1)
    .offset(offset);

  if (before !== null) {
    messagesQuery.andWhere('id', '<', before);
  }

  const messages = await messagesQuery;

  return {
    nextOffset: getNextOffset(messages, offset, limit),
    messages: messages.map(keysToCamelCase).slice(0, limit)
  };
};

export default fetchMessages;
