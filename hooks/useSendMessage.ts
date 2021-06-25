import * as Rx from 'rxjs';
import * as React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { flatMap, filter, map } from 'rxjs/operators';

interface IMessage {
  recipients: number[];
  message: string;
}

interface IResponse {
  sendMessage: {
    id: number;
    conversationId: number;
    message: string;
  };
}

const SEND_MESSAGE = gql`
  mutation SendMessage($message: String!, $recipients: [Int!]!) {
    sendMessage(message: $message, recipients: $recipients) {
      id
      conversationId
      message
    }
  }
`;

const useSendMessage = (): [
  (message: IMessage) => void,
  boolean,
  Error | undefined
] => {
  const subject = React.useRef(new Rx.Subject<IMessage>());
  const [sendMessage, { loading, error }] = useMutation<IResponse, IMessage>(
    SEND_MESSAGE
  );

  const sendSubjectMessage = React.useCallback(
    (x: IMessage) => subject.current.next(x),
    []
  );

  React.useEffect(() => {
    const subscription = subject.current
      .pipe(
        map(x => ({ ...x, message: x.message.trim() })),
        filter(x => x.message !== ''),
        flatMap(x => sendMessage({ variables: x }))
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  return [sendSubjectMessage, loading, error];
};

export default useSendMessage;
