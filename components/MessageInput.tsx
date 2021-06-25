import * as React from 'react';
import { View, TextInput, TextInputProps, StyleSheet } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

import * as Colors from '../constants/colors';
import GradientButton from './GradientButton';
import useSendMessage from '../hooks/useSendMessage';

interface IProps {
  onHeightChange(height: number): void;
  TextInputProps?: TextInputProps;
  participants: number[];
}

const MessageInput: React.SFC<IProps> = ({
  TextInputProps,
  onHeightChange,
  participants
}) => {
  const [sendMessage] = useSendMessage();
  const [message, setMessage] = React.useState('');
  const [prevHeight, setPrevHeight] = React.useState(0);

  const handleOnPress = React.useCallback(() => {
    sendMessage({ recipients: participants, message });
    setMessage('');
  }, [message]);

  return (
    <View style={styles.container}>
      <TextInput
        multiline
        value={message}
        onChangeText={setMessage}
        style={styles.input}
        placeholder="Type something"
        onContentSizeChange={e => {
          const height = e.nativeEvent.contentSize.height;

          if (height !== prevHeight) {
            onHeightChange(height);
          }

          setPrevHeight(height);
        }}
        {...TextInputProps}
      />
      <GradientButton
        LinearGradientProps={{ style: styles.button }}
        TouchableOpacityProps={{ onPress: handleOnPress }}
      >
        <IonIcon name="md-arrow-up" size={18} color="#FFF" />
      </GradientButton>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    flex: 1,
    margin: 12,
    paddingTop: 0,
    maxHeight: 250
  },
  container: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.INPUT_GREY
  },
  button: {
    height: 28,
    width: 28,
    marginRight: 12,
    marginTop: 12,
    marginBottom: 12
  }
});

export default MessageInput;
