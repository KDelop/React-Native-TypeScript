import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import {BLUE_GREY} from '../colors';
import Divider from './Divider';
import Padded from './Padded';

interface IProps extends TouchableOpacityProps {
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
  content: React.ReactNode;
  showDivider?: boolean;
}

const ListItem: React.FunctionComponent<IProps> = ({
  leftAdornment,
  content,
  rightAdornment,
  showDivider,
  ...rest
}) => {
  return (
    <Padded size={{left: 5, right: 5, top: 2, bottom: 2}}>
      <TouchableOpacity delayPressIn={0} style={styles.root} {...rest}>
        {leftAdornment && (
          <View style={styles.leftAdornment}>{leftAdornment}</View>
        )}
        <View style={styles.content}>{content}</View>
        {rightAdornment && (
          <View style={styles.rightAdornment}>{rightAdornment}</View>
        )}
      </TouchableOpacity>
      {showDivider && (
        <Padded size={{top: 3}}>
          <Divider color={BLUE_GREY} />
        </Padded>
      )}
    </Padded>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 0,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  leftAdornment: {
    marginRight: 15,
    justifyContent: 'center',
  },
  rightAdornment: {
    flex: 0,
    justifyContent: 'center',
  },
});

export default ListItem;
