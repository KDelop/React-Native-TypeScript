import * as React from 'react';
import * as Keychain from 'react-native-keychain';
import { take, flatMap, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import GenericLogoView from './GenericLogoView';
import { useNavigation } from 'react-navigation-hooks';
import useAppState from '../hooks/useAppState';
import { signIn } from '../clients/auth';

const AppInitView: React.SFC = () => {
  const subject = React.useRef(new Subject());
  const { navigate } = useNavigation();
  const [appState] = useAppState();

  const onAuthSuccess = React.useCallback(() => {
    navigate('User');
  }, []);

  const onAuthFailure = React.useCallback(() => {
    navigate('Auth');
  }, []);

  React.useEffect(() => {
    const sub = subject.current
      .pipe(
        take(1),
        flatMap(() => Keychain.getInternetCredentials('auth')),
        flatMap(signIn),
        tap(
          () => onAuthSuccess(),
          () => onAuthFailure()
        )
      )
      .subscribe();

    return () => sub.unsubscribe();
  }, []);

  React.useEffect(() => {
    if (appState === 'active') {
      subject.current.next();
    }
  }, [appState]);

  return <GenericLogoView />;
};

export default AppInitView;
