import _ from 'lodash';

export const keysToCamelCase = <T extends {}>(x: T) =>
  _.mapKeys(x, (_v, k) => _.camelCase(k));

export const keysToSnakeCase = <T extends {}>(x: T) =>
  _.mapKeys(x, (_v, k) => _.snakeCase(k));

export const getNextOffset = (
  x: Array<any>,
  prevOffset: number,
  limit: number
) => (x.length > limit ? prevOffset + limit : null);
