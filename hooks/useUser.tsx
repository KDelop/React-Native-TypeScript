import * as React from 'react';
import {Subject} from 'rxjs';
import {mergeMap, tap, catchError} from 'rxjs/operators';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import {IUser, Data} from '../types';

const useUser = (userId?: string) => {
  const subject = React.useRef(new Subject<string>());
  const [user, setUser] = React.useState<
    Data<FirebaseFirestoreTypes.DocumentSnapshot<IUser>>
  >({
    status: 'loading',
    data: null,
  });

  React.useEffect(() => {
    const sub = subject.current
      .pipe(
        tap(() => setUser({status: 'loading', data: null})),
        mergeMap((id) => firestore().collection<IUser>('users').doc(id).get()),
        tap((x) =>
          setUser({
            status: 'success',
            data: x,
          }),
        ),
        catchError((e, x) => {
          setUser({
            status: 'error',
            data: e,
          });
          return x;
        }),
      )
      .subscribe();

    return () => sub.unsubscribe();
  }, []);

  React.useEffect(() => {
    if (userId) {
      subject.current.next(userId);
    }
  }, [userId]);

  return user;
};

export default useUser;
