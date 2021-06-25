import * as React from 'react';
import NetInfo from '@react-native-community/netinfo';
import { Auth } from 'aws-amplify';
import { useFocusEffect, useNavigation } from 'react-navigation-hooks';

import { signOut } from '../clients/auth';

const CheckUserAuth: React.SFC = ({ children }) => {
  const { navigate } = useNavigation();

  const onAuthFailure = React.useCallback(async () => {
    await signOut();
    navigate('Auth');
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const checkAuth = async () => {
        try {
          const netInfoState = await NetInfo.fetch();

          if (!netInfoState.isConnected) return;

          const resp = await Auth.currentUserInfo();

          if (Object.entries(resp).length === 0) {
            onAuthFailure();
          }
        } catch (e) {
          onAuthFailure();
        }
      };

      checkAuth();
    }, [])
  );

  return <>{children}</>;
};

export default CheckUserAuth;
