import * as React from 'react';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import {LIGHT_BRAND_RED} from './colors';

import RoundActionButton, {
  IProps as IRoundActionButtonProps,
} from './designSystem/RoundActionButton';

interface IProps {
  onPress: IRoundActionButtonProps['onPress'];
}

const StreamCloseButton: React.FunctionComponent<IProps> = ({onPress}) => {
  return (
    <RoundActionButton diameter={26} cardColor="none" onPress={onPress}>
      <SimpleLineIcon name="close" size={24} color={LIGHT_BRAND_RED} />
    </RoundActionButton>
  );
};

export default StreamCloseButton;
