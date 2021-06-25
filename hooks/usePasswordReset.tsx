import * as React from 'react';
import * as Rx from 'rxjs';
import {tap, mergeMap, catchError} from 'rxjs/operators';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import {Data} from '../types';
import Toast from 'react-native-toast-message';

interface IPasswordResetArgs {
  email: string;
}

type AuthErrors =
  | 'auth/invalid-email'
  | 'auth/user-not-found'
  | 'auth/missing-android-pkg-name'
  | 'auth/missing-continue-uri'
  | 'auth/missing-ios-bundle-id'
  | 'auth/invalid-continue-uri'
  | 'auth/unauthorized-continue-uri';

const getMessageForErrorCode = (code: AuthErrors) => {
  switch (code) {
    case 'auth/invalid-email':
      return {
        text1: 'Invalid Email Address',
        text2: 'Please enter a valid email address',
      };
    case 'auth/user-not-found':
      return {
        text1: 'Account Not Found',
        text2: "We couldn't find that account",
      };
    default:
      return {
        text1: 'Error',
        text2: 'An error occured while trying to reset your password',
      };
  }
};

const useResetPassword = () => {
  const {navigate} = useNavigation();
  const subject = React.useRef(new Rx.Subject<IPasswordResetArgs>());
  const [response, setResponse] = React.useState<Data<null>>({
    status: 'success',
    data: null,
  });

  const resetPassword = (x: IPasswordResetArgs) => subject.current.next(x);

  React.useEffect(() => {
    const sub = subject.current
      .pipe(
        tap(() => setResponse({status: 'loading', data: null})),
        mergeMap(({email}) => auth().sendPasswordResetEmail(email)),
        tap(() => {
          setResponse({status: 'success', data: null});
          navigate('SignIn', {resetPassword: true});
        }),
        catchError((e, x) => {
          Toast.show({
            type: 'error',
            ...getMessageForErrorCode(e.code),
          });
          setResponse({status: 'error', data: e});
          return x;
        }),
      )
      .subscribe();

    return () => sub.unsubscribe();
  }, []);

  return [response, resetPassword] as const;
};

export default useResetPassword;
