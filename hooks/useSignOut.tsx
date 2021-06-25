import * as React from 'react';
import * as Rx from 'rxjs';
import auth from '@react-native-firebase/auth';
import {tap, catchError, delayWhen} from 'rxjs/operators';

import {Data} from '../types';

const useSignOut = () => {
  const subject = React.useRef(new Rx.Subject<() => void>());
  const [response, setResponse] = React.useState<Data<null>>({
    status: 'loading',
    data: null,
  });

  const signOut = (cb?: () => void) => subject.current.next(cb);

  React.useEffect(() => {
    const sub = subject.current
      .pipe(
        tap(() => setResponse({status: 'loading', data: null})),
        delayWhen(() => Rx.from(auth().signOut())),
        tap((cb) => {
          if (cb) cb();
          setResponse({status: 'success', data: null});
        }),
        catchError((e, x) => {
          setResponse({
            status: 'error',
            data: e,
          });
          return x;
        }),
      )
      .subscribe();

    return () => sub.unsubscribe();
  }, []);

  return [response, signOut] as const;
};

export default useSignOut;
