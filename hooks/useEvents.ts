import * as Rx from 'rxjs';
import * as React from 'react';
import RNEventSource, { IEvent } from 'react-native-event-source';
import { useSelector } from 'react-redux';
import { oc } from 'ts-optchain';

import config from '../config.json';

const useEvents = () => {
  const subject = React.useRef(new Rx.Subject<IEvent>());
  const token = useSelector((x: Athleticus.IApplicationState) =>
    oc(x).core.authToken()
  );

  React.useEffect(() => {
    if (token) {
      const es = new RNEventSource(`${config.apiUri}/events`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      es.addEventListener('message', x => subject.current.next(x));
      return () => {
        es.removeAllListeners();
        es.close();
      };
    }
  }, [token]);

  return subject.current;
};

export default useEvents;
