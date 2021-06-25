import * as React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {MEDIUM_GREY} from './colors';
import Card from './designSystem/Card';

import Padded from './designSystem/Padded';

interface IProps extends TextInputProps {}

const StreamChatInput: React.FunctionComponent<IProps> = (props) => {
  return (
    <Padded size={0} style={styles.root}>
      <Card style={styles.card}>
        <Padded
          size={{top: 1.5, bottom: 1.5, left: 5, right: 5}}
          style={{flex: 0}}>
          <TextInput
            {...props}
            style={[props.style, styles.textInput]}
            placeholderTextColor={MEDIUM_GREY}
            multiline
          />
        </Padded>
      </Card>
    </Padded>
  );
};

const styles = StyleSheet.create({
  root: {},
  textInput: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Montserrat-Regular',
  },
  card: {
    minHeight: 40,
    maxHeight: 80,
  },
});

export default StreamChatInput;
