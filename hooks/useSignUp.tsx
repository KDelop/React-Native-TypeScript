import * as React from 'react';
import * as Rx from 'rxjs';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {tap, mergeMap, catchError} from 'rxjs/operators';
import Toast from 'react-native-toast-message';

import {Data, ICreateAccountArgs} from '../types';

type AuthErrors =
  | 'auth/email-already-in-use'
  | 'auth/invalid-email'
  | 'auth/operation-not-allowed'
  | 'auth/weak-password';

const getMessageForErrorCode = (code: AuthErrors) => {
  switch (code) {
    case 'auth/invalid-email':
      return {
        text1: 'Invalid Email Address',
        text2: 'Please enter a valid email address',
      };
    case 'auth/email-already-in-use':
      return {
        text1: 'Email In User',
        text2: 'The email you entered is already in use',
      };
    case 'auth/weak-password':
      return {
        text1: 'Weak Password',
        text2: 'Your password should be at least 6 characters',
      };
    case 'auth/operation-not-allowed':
    default:
      return {
        text1: 'Error',
        text2: 'An error occured while attempting your request',
      };
  }
};

const upperFirst = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const getFirstAndLast = (fullName: string) => {
  const names = fullName.trim().trim().replace(/\s+/g, ' ').split(' ');
  return {
    firstName: upperFirst(names?.[0]) ?? '',
    lastName: upperFirst(names?.[1]) ?? '',
  };
};

const useSignUp = () => {
  const subject = React.useRef(new Rx.Subject<ICreateAccountArgs>());
  const [response, setResponse] = React.useState<Data<null>>({
    status: 'success',
    data: null,
  });

  const signUp = (x: ICreateAccountArgs) => subject.current.next(x);

  React.useEffect(() => {
    const sub = subject.current
      .pipe(
        tap(() => setResponse({status: 'loading', data: null})),
        mergeMap(async (newUserData) => {
          const {email, password, fullName, ...rest} = newUserData;
          const newUser = await auth().createUserWithEmailAndPassword(
            email,
            password,
          );
          await firestore()
            .collection('users')
            .doc(newUser.user.uid)
            .set({
              email,
              createdAt: new Date(),
              lastLoginAt: new Date(),
              ...getFirstAndLast(fullName),
              ...rest,
            });
          return {email, ...rest};
        }),
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

  return [response, signUp] as const;
};

export default useSignUp;
