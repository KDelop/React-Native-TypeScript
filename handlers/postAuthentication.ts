import { CognitoUserPoolTriggerHandler } from 'aws-lambda';
import 'source-map-support/register';
import 'cross-fetch/polyfill';

import fetchUser from '../db/query/fetchUser';
import insertUser from '../db/mutation/insertUser';
import updateUser from '../db/mutation/updateUser';

const postAuthenticationTrigger: CognitoUserPoolTriggerHandler = async (
  event,
  context,
  callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const user = await fetchUser(event?.request?.userAttributes?.sub);

    if (user) {
      await updateUser(
        { lastLoginAt: new Date().toISOString() },
        event?.request?.userAttributes?.sub
      );
    } else {
      await insertUser({
        id: event?.request?.userAttributes?.sub,
        email: event?.request?.userAttributes?.email,
        name: event?.request?.userAttributes?.name,
        dateOfBirth: event?.request?.userAttributes?.birthdate,
        lastLoginAt: new Date().toISOString()
      });
    }

    return callback(null, event);
  } catch (e) {
    console.error(e);
    return callback(null, {});
  }
};

export default postAuthenticationTrigger;
