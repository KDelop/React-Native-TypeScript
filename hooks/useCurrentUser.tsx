import * as React from 'react';

import {UserContext} from '../components/UserProvider';
import useUser from './useUser';

const useCurrentUser = () => {
  const userContext = React.useContext(UserContext);
  return useUser(userContext?.user?.uid);
};

export default useCurrentUser;
