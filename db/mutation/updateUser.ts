import _ from 'lodash';

import db from '../../dbConnection';
import { keysToSnakeCase } from '../utils';

interface IUser {
  name?: string;
  dateOfBirth?: string;
  lastLoginAt?: string;
}

const updateUser = (user: IUser, id: string) =>
  db('user').update(keysToSnakeCase(user)).where({ id });

export default updateUser;
