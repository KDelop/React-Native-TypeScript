import * as React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import LineIcon from 'react-native-vector-icons/SimpleLineIcons';

import { BRAND_BLUE } from '../constants/colors';

interface IProps {
  TouchableOpacityProps?: TouchableOpacityProps;
}

const MessagesIconButton: React.SFC<IProps> = ({ TouchableOpacityProps }) => {
  return (
    <TouchableOpacity {...TouchableOpacityProps}>
      <LineIcon name="drawer" size={20} color={BRAND_BLUE} />
    </TouchableOpacity>
  );
};

export default MessagesIconButton;
