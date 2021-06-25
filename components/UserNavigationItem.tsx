import * as React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';

import Typography from './Typography';
import { LIGHT_GREY, INPUT_GREY } from '../constants/colors';

export const HEIGHT = 60;

interface IProps {
  icon: React.ReactNode;
  text: string;
  hideBorder?: boolean;
}

const UserNavigationItem: React.SFC<IProps> = ({
  icon,
  text,
  hideBorder,
  ...rest
}) => {
  return (
    <View style={styles.root} {...rest}>
      <View style={[styles.content, !hideBorder && styles.border]}>
        <View style={styles.icon}>{icon}</View>
        <Typography style={styles.text} variant="body2">
          {text}
        </Typography>
        <MaterialIcon name="chevron-right" size={30} color={LIGHT_GREY} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingRight: 15,
    paddingLeft: 15,
    height: HEIGHT
  },
  icon: {
    width: 30
  },
  content: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%'
  },
  text: {
    paddingLeft: 10,
    fontSize: 14,
    flex: 1
  },
  border: {
    borderBottomColor: INPUT_GREY,
    borderBottomWidth: 1
  }
});

export default UserNavigationItem;
