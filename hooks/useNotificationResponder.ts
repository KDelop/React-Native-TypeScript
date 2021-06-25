import * as React from 'react';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Platform} from 'react-native';
import Toast from 'react-native-toast-message';

interface IChatMessage extends FirebaseMessagingTypes.RemoteMessage {
  data: {type: 'chat'; sendingUserId: string; chatId: string};
}

interface IGroupCall extends FirebaseMessagingTypes.RemoteMessage {
  data: {type: 'groupCall'; sendingUserId: string; callId: string};
}

type Data = IChatMessage | IGroupCall;

const useNotificationResponder = () => {
  const {navigate} = useNavigation();

  const handleMessageNavigation = (remoteMessage: Data) => {
    const data = remoteMessage.data;
    switch (data.type) {
      case 'chat': {
        navigate('Chat', {chatId: data.chatId});
        break;
      }
      case 'groupCall': {
        navigate('GroupCall', {callId: data.callId});
        break;
      }
    }
  };

  // TODO: Dry out the handlers below
  const handleMessageInApp = (remoteMessage: Data) => {
    switch (remoteMessage.data.type) {
      case 'chat': {
        Toast.show({
          type: 'message',
          text1: remoteMessage?.notification?.title,
          text2: remoteMessage?.notification?.body,
          props: {
            userId: remoteMessage.data?.sendingUserId,
          },
          onPress: () => {
            Toast.hide();
            handleMessageNavigation(remoteMessage);
          },
        });
        break;
      }
      case 'groupCall': {
        Toast.show({
          type: 'message',
          text1: remoteMessage?.notification?.title,
          text2: remoteMessage?.notification?.body,
          props: {
            userId: remoteMessage.data?.sendingUserId,
          },
          onPress: () => {
            Toast.hide();
            handleMessageNavigation(remoteMessage);
          },
        });
        break;
      }
    }
  };

  React.useEffect(() => {
    // TODO: Remove this later
    Platform.OS === 'ios' &&
      PushNotificationIOS.setApplicationIconBadgeNumber(0);

    const unsubOnMessage = messaging().onMessage((remoteMessage) => {
      handleMessageInApp(remoteMessage as Data);
    });

    const unsubOpenApp = messaging().onNotificationOpenedApp((remoteMessage) =>
      handleMessageNavigation(remoteMessage as Data),
    );

    return () => {
      unsubOnMessage();
      unsubOpenApp();
    };
  }, []);
};

export default useNotificationResponder;
