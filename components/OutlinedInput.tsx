import * as React from 'react';
import { View, TextInputProps, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { DARK_GREY, INPUT_GREY, LIGHT_GREY } from '../constants/colors';

const OutlinedInput: React.SFC<TextInputProps> = props => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor={LIGHT_GREY}
        {...props}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 6,
    paddingRight: 6,
    color: DARK_GREY
  },
  container: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: INPUT_GREY,
    borderRadius: 8
  }
});

export default OutlinedInput;
