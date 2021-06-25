import _ from 'lodash';

import db from '../../dbConnection';
import { keysToCamelCase } from '../utils';

const insertRoomMessage = async (
  userId: string,
  roomId: string,
  body: string
) => {
  const roomUser = await db('room_user')
    .select()
    .where({ user_id: userId, room_id: roomId })
    .first();

  if (!roomUser) {
    throw new Error('User not authorized to message room');
  }

  const message = await db('room_message').insert(
    {
      room_id: roomId,
      user_id: userId,
      body: body
    },
    ['id', 'room_id', 'user_id AS sent_by_user_id', 'body', 'created_at']
  );

  const respMessage = message?.[0];
  return respMessage ? keysToCamelCase(respMessage) : null;
};

export default insertRoomMessage;
