import * as React from 'react';
import {Subject} from 'rxjs';
import firestore from '@react-native-firebase/firestore';
import {mergeMap, tap, catchError} from 'rxjs/operators';

import {Data, IChatRoom} from '../types';
import {UserContext} from '../components/UserProvider';

interface IChatRoomArgs {
  userId: string;
  chatId: string;
}

const useChatRoom = (chatId?: string) => {
  const userContext = React.useContext(UserContext);
  const chatRoomSubject = React.useRef(new Subject<IChatRoomArgs>());
  const [chatRoomResponse, setChatRoomResponse] = React.useState<
    Data<IChatRoom | null>
  >({
    status: 'success',
    data: null,
  });

  /**
   * Fetch chat room by chat id or by new chat id from created room when
   * sending a new message
   */
  React.useEffect(() => {
    const sub = chatRoomSubject.current
      .pipe(
        tap(() => setChatRoomResponse({status: 'loading', data: null})),
        mergeMap((x) =>
          firestore()
            .collection<IChatRoom>('chatRooms')
            .doc(x.chatId)
            .get()
            .then((chatRoom) => {
              chatRoom.ref.update(
                new firestore.FieldPath('members', x.userId, 'lastSeenMessage'),
                chatRoom.get(new firestore.FieldPath('lastMessage', 'id')),
              );
              return chatRoom;
            }),
        ),
        tap((x) =>
          setChatRoomResponse({status: 'success', data: x.data() ?? null}),
        ),
        catchError((e, x) => {
          setChatRoomResponse({
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
    if (chatId && userContext.user) {
      chatRoomSubject.current.next({chatId, userId: userContext.user.uid});
    }
  }, [chatId, userContext.user]);

  return chatRoomResponse;
};

export default useChatRoom;
