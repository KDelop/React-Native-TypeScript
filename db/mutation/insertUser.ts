import _ from 'lodash';

import db from '../../dbConnection';
import { keysToSnakeCase } from '../utils';

interface IUser {
  id: string;
  email: string;
  name: string;
  dateOfBirth: string;
  lastLoginAt: string;
}

const insertUser = (user: IUser) => db('user').insert(keysToSnakeCase(user));

export default insertUser;
