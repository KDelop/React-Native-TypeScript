import * as React from 'react';
import storage from '@react-native-firebase/storage';
import {Subject} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';

const cache = new Map<string, string>();

const useCachedDownloadURL = (refPath?: string) => {
  const subject = React.useRef(new Subject<string>()).current;
  const [downloadURL, setDownloadURL] = React.useState(
    refPath ? cache.get(refPath) : undefined,
  );

  React.useEffect(() => {
    const sub = subject
      .pipe(
        mergeMap((x) =>
          storage()
            .ref(x)
            .getDownloadURL()
            .then((url) => ({refPath: x, url})),
        ),
        // TODO: Does more need to be done here when we cant find something?
        catchError((e, x) => x),
      )
      .subscribe((x) => {
        setDownloadURL(x.url);
        cache.set(x.refPath, x.url);
      });

    return () => sub.unsubscribe();
  }, []);

  React.useEffect(() => {
    if (refPath !== undefined) {
      subject.next(refPath);
    }
  }, [refPath]);

  const refetch = React.useCallback(() => subject.next(refPath), [refPath]);

  return [downloadURL, refetch] as const;
};

export default useCachedDownloadURL;
