import * as React from 'react';
import * as Rx from 'rxjs';
import {tap, mergeMap, catchError} from 'rxjs/operators';
import auth from '@react-native-firebase/auth';

import {Data} from '../types';
import Toast from 'react-native-toast-message';

interface ISignInArgs {
  email: string;
  password: string;
}

type AuthErrors =
  | 'auth/invalid-email'
  | 'auth/user-disabled'
  | 'auth/user-not-found'
  | 'auth/too-many-requests'
  | 'auth/wrong-password';

const getMessageForErrorCode = (code: AuthErrors) => {
  switch (code) {
    case 'auth/invalid-email':
      return {
        text1: 'Invalid Email Address',
        text2: 'Please enter a valid email address',
      };
    case 'auth/user-disabled':
      return {
        text1: 'Account Disabled',
        text2: 'This account has been disabled',
      };
    case 'auth/user-not-found':
      return {
        text1: 'Account Not Found',
        text2: "We couldn't find that account",
      };
    case 'auth/wrong-password':
      return {
        text1: 'Incorrect Password',
        text2: 'The password you entered is not correct',
      };
    case 'auth/too-many-requests':
      return {
        text1: 'Too Many Failed Login Attempts',
        text2:
          'Your account has been locked. Please wait a moment or reset your password to unlock you account.',
      };
    default:
      return {
        text1: 'Error',
        text2: 'An error occured while attempting your request',
      };
  }
};

const useSignIn = () => {
  const subject = React.useRef(new Rx.Subject<ISignInArgs>());
  const [response, setResponse] = React.useState<Data<null>>({
    status: 'success',
    data: null,
  });

  const signIn = (x: ISignInArgs) => subject.current.next(x);

  React.useEffect(() => {
    const sub = subject.current
      .pipe(
        tap(() => setResponse({status: 'loading', data: null})),
        mergeMap(({email, password}) =>
          auth().signInWithEmailAndPassword(email, password),
        ),
        tap(() => setResponse({status: 'success', data: null})),
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

  return [response, signIn] as const;
};

export default useSignIn;
