import * as React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps as ITouchableOpacityProps
} from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

interface IProps {
  userId?: number;
  TouchableOpacityProps?: ITouchableOpacityProps;
}

const UserProfileButton: React.SFC<IProps> = ({
  children,
  userId,
  TouchableOpacityProps
}) => {
  const { navigate } = useNavigation();

  const handleOnPress = () => {
    if (userId) {
      navigate('Profile', { userId });
    }
  };

  return (
    <TouchableOpacity onPress={handleOnPress} {...TouchableOpacityProps}>
      {children}
    </TouchableOpacity>
  );
};

export default UserProfileButton;
