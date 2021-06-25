import * as React from 'react';
import {NavigationHelpersContext} from '@react-navigation/native';

import useCurrentUser from './useCurrentUser';

interface IToUser {
  firstName: string;
  lastName: string;
  id: string;
}

const useChatNavigation = () => {
  const currentUser = useCurrentUser();
  const navigation = React.useContext(NavigationHelpersContext);

  const navigateToChat = async (toUser: IToUser) => {
    if (currentUser.status !== 'success') {
      return;
    }

    return navigation?.navigate('Chat', {
      chatId: undefined,
      members: {
        [toUser.id]: {
          firstName: toUser.firstName,
          lastName: toUser.lastName,
        },
        [currentUser.data.id]: {
          firstName: currentUser.data.get('firstName'),
          lastName: currentUser.data.get('lastName'),
        },
      },
    });
  };

  return navigateToChat;
};

export default useChatNavigation;
