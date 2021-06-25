import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';

interface IProps extends TouchableOpacityProps {
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
  content: React.ReactNode;
}

const ListItem: React.SFC<IProps> = ({
  leftAdornment,
  content,
  rightAdornment,
  ...rest
}) => {
  return (
    <TouchableOpacity style={styles.root} {...rest}>
      {leftAdornment && (
        <View style={styles.leftAdornment}>{leftAdornment}</View>
      )}
      <View style={styles.content}>{content}</View>
      {rightAdornment && (
        <View style={styles.rightAdornment}>{rightAdornment}</View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 0,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10
  },
  content: {
    flex: 1
  },
  leftAdornment: {
    marginRight: 15,
    justifyContent: 'center'
  },
  rightAdornment: {
    flex: 0,
    justifyContent: 'center'
  }
});

export default ListItem;
