import _ from 'lodash';

import db from '../../dbConnection';
import usersAreTeammates from '../query/usersAreTeammates';
import fetchRoomByParticipants from '../query/fetchRoomByParticipants';

const insertRoom = async (
  userId: string,
  participantIds: Array<string>,
  firstMessageBody: string,
  privateRoom: boolean = true
) => {
  const uniqParticipantIds = _.uniq(participantIds).filter((x) => x != userId);

  if (privateRoom && !(await usersAreTeammates(userId, uniqParticipantIds))) {
    throw new Error('User must be teammates with all room participants');
  }

  const roomByParticipants = await fetchRoomByParticipants(
    userId,
    participantIds
  );

  if (roomByParticipants) {
    throw new Error('Room with participants already exists');
  }

  await db.transaction(async (tx) => {
    const room = await tx('room').insert({}, ['id']);
    const roomId = room?.[0]?.id;

    await tx('room_user').insert({
      room_id: roomId,
      user_id: userId
    });

    for (const participantId of uniqParticipantIds) {
      await tx('room_user').insert({
        room_id: roomId,
        user_id: participantId
      });
    }

    await tx('room_message').insert({
      user_id: userId,
      room_id: roomId,
      body: firstMessageBody
    });
  });

  return fetchRoomByParticipants(userId, participantIds);
};

export default insertRoom;
