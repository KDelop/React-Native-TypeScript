import _ from 'lodash';

import db from '../../dbConnection';
import { keysToCamelCase } from '../utils';

const fetchUser = async (id: string) => {
  const user = await db('user')
    .select()
    .where({
      id
    })
    .first();

  return user ? keysToCamelCase(user) : null;
};

export default fetchUser;
