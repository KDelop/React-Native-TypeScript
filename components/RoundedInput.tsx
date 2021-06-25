import * as React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';

import Card from './Card';
import { MEDIUM_GREY, LIGHT_GREY } from '../constants/colors';

export interface IProps extends TextInputProps {
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
}

const RoundedInput: React.SFC<IProps> = ({
  leftAdornment,
  rightAdornment,
  ...rest
}) => {
  return (
    <Card style={styles.root}>
      {leftAdornment && (
        <View style={[styles.adornment, styles.leftAdornment]}>
          {leftAdornment}
        </View>
      )}
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor={LIGHT_GREY}
        {...rest}
      />
      {rightAdornment && (
        <View style={[styles.adornment, styles.rightAdornment]}>
          {rightAdornment}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16
  },
  adornment: {
    flex: 0
  },
  leftAdornment: {
    marginRight: 6
  },
  rightAdornment: {
    marginLeft: 6
  },
  input: {
    flex: 1,
    height: 38,
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#000'
  }
});

export default RoundedInput;
