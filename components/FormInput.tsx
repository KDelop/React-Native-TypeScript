import * as React from 'react';
import { TextInputProps, TextInput, StyleSheet } from 'react-native';
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text';

interface IPropsFormInput {
  borderBottom?: boolean;
  gutterBottom?: boolean;
}

type PropsFormInput = IPropsFormInput & TextInputProps;

export const FormInput: React.SFC<PropsFormInput> = ({
  borderBottom,
  gutterBottom,
  style,
  ...props
}) => (
  <TextInput
    placeholderTextColor="#FFF"
    style={[
      styles.input,
      borderBottom && styles.borderBottom,
      gutterBottom && styles.gutterBottom,
      style
    ]}
    {...props}
  />
);

type PropsFormInputMask = IPropsFormInput & TextInputMaskProps;

export const FormInputMask: React.SFC<PropsFormInputMask> = ({
  borderBottom,
  gutterBottom,
  style,
  ...props
}) => (
  <TextInputMask
    placeholderTextColor="#FFF"
    style={[
      styles.input,
      borderBottom && styles.borderBottom,
      gutterBottom && styles.gutterBottom,
      style
    ]}
    {...props}
  />
);

const styles = StyleSheet.create({
  input: {
    height: 55,
    width: '100%',
    backgroundColor: 'rgba(235, 236, 237, 0.2)',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Roboto',
    color: '#FFF'
  },
  borderBottom: {
    borderBottomColor: '#555D69',
    borderBottomWidth: 1
  },
  gutterBottom: {
    marginBottom: 12
  }
});
