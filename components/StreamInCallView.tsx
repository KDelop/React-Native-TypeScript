import * as React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import useUser from '../hooks/useUser';
import Padded from './designSystem/Padded';
import {useModal} from '../hooks/useModal';
import useStream from '../hooks/useStream';
import StreamChatList from './StreamChatList';
import StreamChatInput from './StreamChatInput';
import StreamSendButton from './StreamSendButton';
import Typography from './designSystem/Typography';
import useStreamChat from '../hooks/useStreamChat';
import StreamCloseButton from './StreamCloseButton';
import AppContainer from './designSystem/AppContainer';
import StreamUserChip from './designSystem/StreamUserChip';

interface IProps {
  onRequestClose(onLeave?: () => void): void;
  streamId: string;
  currentUserId: string;
}

const StreamInCallView: React.FunctionComponent<IProps> = ({
  streamId,
  onRequestClose,
  currentUserId,
}) => {
  const currentUser = useUser(currentUserId);
  const streamResponse = useStream(streamId);
  const [message, setMessage] = React.useState('');
  const {viewerCount, state, dispatch} = useStreamChat(streamId, currentUserId);
  const openModal = useModal();

  if (currentUser.status !== 'success' || streamResponse.status !== 'success') {
    return null;
  }

  const host = streamResponse.data?.initiatedBy;
  return (
    <>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']}
        style={styles.root}>
        <KeyboardAvoidingView
          enabled
          behavior="padding"
          style={styles.keyboardAvoidingView}>
          <AppContainer
            style={styles.appContainer}
            statusBarStyle="light-content">
            <View style={styles.content}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Padded
                  size={{left: 5, right: 5, top: 2}}
                  style={styles.header}>
                  <StreamUserChip
                    firstName={host?.firstName}
                    lastName={host?.lastName}
                    userId={host?.id}
                    isPro={Boolean(host?.isPro)}
                    onPress={() => {
                      openModal('Profile', {
                        userId: host?.id,
                        beforeNavigate: async () => {
                          dispatch('LOGOUT');
                        },
                      });
                    }}
                  />
                  <StreamCloseButton
                    onPress={() => {
                      dispatch('LOGOUT');
                      onRequestClose && onRequestClose();
                    }}
                  />
                </Padded>
              </TouchableWithoutFeedback>
              <StreamChatList
                streamTitle={streamResponse.data.title}
                streamDescription={streamResponse.data.description}
                messages={state.context.messages}
                hostId={host?.id}
              />
              <Padded
                style={styles.footer}
                size={{left: 5, right: 5, bottom: 2, top: 2}}>
                <Padded size={{right: 3}} style={styles.chatInputContainer}>
                  <StreamChatInput
                    placeholder="Say something..."
                    onChangeText={setMessage}
                    value={message}
                  />
                </Padded>
                <StreamSendButton
                  onPress={() => {
                    if (!message) {
                      return;
                    }
                    dispatch('SEND', {
                      data: {
                        firstName: currentUser.data?.get('firstName'),
                        lastName: currentUser.data?.get('lastName'),
                        message,
                      },
                    });
                    setMessage('');
                  }}
                />
                <Padded size={{left: 3}} style={styles.viewCountContainer}>
                  <IonIcon name="eye" color="white" size={24} />
                  <Typography variant="streamViewCountText">
                    {viewerCount === null ? '-' : viewerCount}
                  </Typography>
                </Padded>
              </Padded>
            </View>
          </AppContainer>
        </KeyboardAvoidingView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  chatInputContainer: {
    flex: 1,
  },
  appContainer: {
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  touchableWithoutFeedback: {
    height: '100%',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  root: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    zIndex: 10,
  },
  viewCountContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StreamInCallView;
