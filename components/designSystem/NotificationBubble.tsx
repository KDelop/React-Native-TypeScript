import * as React from 'react';
import {View} from 'react-native';

import {BRAND_BLUE} from '../colors';

const DIAMETER = 8;

interface IProps {
  color?: string;
  diameter?: number;
}

const NotificationBubble: React.FunctionComponent<IProps> = ({
  diameter = DIAMETER,
  color = BRAND_BLUE,
}) => {
  return (
    <View
      style={{
        height: diameter,
        width: diameter,
        backgroundColor: color,
        borderRadius: diameter / 2,
      }}
    />
  );
};

export default NotificationBubble;
