import * as React from 'react';
import {View} from 'react-native';
import {BLUE_GREY, MESSAGE_BUBBLE_GREY} from '../colors';

interface IProps {
  color?: string;
  vertical?: boolean;
}

const Divider: React.FunctionComponent<IProps> = ({
  color,
  vertical = false,
}) => {
  return (
    <View
      style={
        vertical
          ? {
              height: '100%',
              width: 1,
              backgroundColor: color || MESSAGE_BUBBLE_GREY,
            }
          : {
              width: '100%',
              height: 1,
              backgroundColor: color || MESSAGE_BUBBLE_GREY,
            }
      }
    />
  );
};

export default Divider;
