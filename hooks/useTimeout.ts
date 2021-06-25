import * as React from 'react';
import {of, Subject} from 'rxjs';
import {delay, mergeMap, tap} from 'rxjs/operators';

interface ITimeoutArgs {
  waitMs: number;
  cb(): void;
}

const useTimeout = () => {
  const subject = React.useRef(new Subject<ITimeoutArgs>()).current;

  React.useEffect(() => {
    const sub = subject
      .pipe(
        mergeMap((x) => of(x).pipe(delay(x.waitMs))),
        tap((x) => x.cb()),
      )
      .subscribe();

    return () => sub.unsubscribe();
  }, []);

  const setTimeoutCB = React.useCallback(
    (cb: ITimeoutArgs['cb'], waitMs: number) => {
      subject.next({
        cb,
        waitMs,
      });
    },
    [],
  );

  return setTimeoutCB;
};

export default useTimeout;
