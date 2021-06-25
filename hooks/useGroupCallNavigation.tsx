import * as React from 'react';
import {NavigationHelpersContext} from '@react-navigation/native';

import useCurrentUser from './useCurrentUser';
import {IGenericParticipant} from '../types';

const useGroupCallNavigation = () => {
  const navigation = React.useContext(NavigationHelpersContext);
  const currentUser = useCurrentUser();

  const navigate = (toUsers: Array<IGenericParticipant>) => {
    if (currentUser.status !== 'success') {
      return;
    }

    try {
      navigation?.navigate('GroupCall', {
        participants: [
          {
            id: currentUser.data.id,
            firstName: currentUser.data.get('firstName'),
            lastName: currentUser.data.get('lastName'),
          },
          ...toUsers,
        ],
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  return navigate;
};

export default useGroupCallNavigation;
