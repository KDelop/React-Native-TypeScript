import _ from 'lodash';

import db from '../../dbConnection';
import fetchRoom from '../query/fetchRoom';

const updateRoomImpression = async (
  impressionAt: string,
  roomId: string,
  userId: string
) => {
  await db('room_user')
    .update({ last_impression_at: impressionAt })
    .where({ room_id: roomId, user_id: userId });

  return await fetchRoom(userId, roomId);
};

export default updateRoomImpression;
