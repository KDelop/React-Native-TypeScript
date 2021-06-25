import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import {BRAND_RED, LIGHT_GREY} from '../colors';
import Typography from './Typography';

interface IProps extends TouchableOpacityProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
}

const BottomNavigationItem: React.FunctionComponent<IProps> = ({
  icon,
  active,
  text,
  ...rest
}) => {
  return (
    <TouchableOpacity delayPressIn={0} style={[styles.root]} {...rest}>
      <View style={styles.icon}>
        {React.isValidElement(icon) &&
          React.cloneElement(icon, {
            color: active ? BRAND_RED : LIGHT_GREY,
          })}
      </View>
      <Typography
        style={[styles.text, {color: active ? BRAND_RED : LIGHT_GREY}]}>
        {text}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    height: '100%',
    paddingTop: 12,
    paddingBottom: 12,
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    textTransform: 'none',
  },
  icon: {
    flex: 1,
    alignItems: 'center',
  },
});

export default BottomNavigationItem;
