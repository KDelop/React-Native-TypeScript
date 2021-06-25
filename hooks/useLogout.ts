import { useNavigation } from 'react-navigation-hooks';
import * as React from 'react';

import { signOut } from '../clients/auth';

export default function useLogout(): [typeof logout] {
  const { navigate } = useNavigation();

  const logout = React.useCallback(async () => {
    try {
      await signOut();
      navigate('Auth');
    } catch (e) {
      console.error(e);
    }
  }, []);

  return [logout];
}
