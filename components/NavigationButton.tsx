import * as React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

import { Stacks } from './App';

interface IProps extends TouchableOpacityProps {
  to: Stacks;
}

const NavigationButton: React.SFC<IProps> = ({ to, ...rest }) => {
  const { navigate } = useNavigation();

  const handleOnPress = React.useCallback(() => {
    if (to) {
      navigate(to);
    }
  }, []);

  return (
    <TouchableOpacity onPress={handleOnPress} {...rest}></TouchableOpacity>
  );
};

export default NavigationButton;
