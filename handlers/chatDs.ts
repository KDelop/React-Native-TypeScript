import { Handler } from 'aws-lambda';
import 'source-map-support/register';
import 'cross-fetch/polyfill';

import fetchRooms from '../db/query/fetchRooms';
import fetchRoomParticipants from '../db/query/fetchRoomParticipants';
import fetchLastMessage from '../db/query/fetchLastMessage';
import fetchMessages from '../db/query/fetchMessages';
import fetchRoom from '../db/query/fetchRoom';
import updateRoomImpression from '../db/mutation/updateRoomImpression';
import insertRoom from '../db/mutation/insertRoom';
import fetchRoomByParticipants from '../db/query/fetchRoomByParticipants';
import insertRoomMessage from '../db/mutation/insertRoomMessage';

const chatDs: Handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    switch (event.field) {
      case 'room.lastMessage':
        return callback(null, await fetchLastMessage(event?.source?.id));
      case 'room.participants':
        return callback(null, await fetchRoomParticipants(event?.source?.id));
      case 'allRooms':
        return callback(
          null,
          await fetchRooms(
            event?.identity?.claims?.sub,
            event?.arguments?.limit,
            event?.arguments?.offset
          )
        );
      case 'room':
        return callback(
          null,
          await fetchRoom(
            event?.identity?.claims?.sub,
            event?.arguments?.roomId
          )
        );
      case 'allMessages':
        return callback(
          null,
          await fetchMessages(
            event?.identity?.claims?.sub,
            event?.arguments?.roomId,
            event?.arguments?.before,
            event?.arguments?.limit,
            event?.arguments?.offset
          )
        );
      case 'impressRoom':
        return callback(
          null,
          await updateRoomImpression(
            event?.arguments?.impressionAt,
            event?.arguments?.roomId,
            event?.identity?.claims?.sub
          )
        );
      case 'roomByParticipants':
        return callback(
          null,
          await fetchRoomByParticipants(
            event?.identity?.claims?.sub,
            event?.arguments?.participants
          )
        );
      case 'createRoom':
        return callback(
          null,
          await insertRoom(
            event?.identity?.claims?.sub,
            event?.arguments?.participants,
            event?.arguments?.firstMessageBody
          )
        );
      case 'sendMessage':
        return callback(
          null,
          await insertRoomMessage(
            event?.identity?.claims?.sub,
            event?.arguments?.roomId,
            event?.arguments?.body
          )
        );
    }
  } catch (e) {
    console.log(e);
    return callback('Error while querying chat', null);
  }
};

export default chatDs;
