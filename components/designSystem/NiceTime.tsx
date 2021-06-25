import * as Rx from 'rxjs';
import * as React from 'react';
import {formatDistanceToNow} from 'date-fns';

interface IProps {
  date: Date | number;
}

const NiceTime: React.FunctionComponent<IProps> = ({date}) => {
  const timestamp = typeof date === 'number' ? new Date(date) : date;
  return <React.Fragment>{formatDistanceToNow(timestamp)} ago</React.Fragment>;
};

export default NiceTime;
