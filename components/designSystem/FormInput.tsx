import * as React from 'react';
import {TextInputProps, TextInput, StyleSheet} from 'react-native';
import BlurView from './BlurView';

interface IPropsFormInput {
  top?: boolean;
  bottom?: boolean;
  borderBottom?: boolean;
}

type PropsFormInput = IPropsFormInput & TextInputProps;

const FormInput = React.forwardRef<TextInput, PropsFormInput>(
  ({borderBottom, style, top, bottom, ...props}, ref) => (
    <BlurView>
      <TextInput
        ref={ref}
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        style={[
          styles.input,
          borderBottom && styles.borderBottom,
          style,
          top && styles.topBorderRadius,
          bottom && styles.bottomBorderRadius,
        ]}
        {...props}
      />
    </BlurView>
  ),
);

const styles = StyleSheet.create({
  topBorderRadius: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  bottomBorderRadius: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  input: {
    height: 55,
    width: '100%',
    backgroundColor: 'rgba(235, 236, 237, 0.2)',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Roboto',
    color: '#FFF',
  },
  borderBottom: {
    borderBottomColor: '#555D69',
    borderBottomWidth: 1,
  },
});

export default FormInput;
