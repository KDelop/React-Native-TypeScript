import * as React from 'react';
import Typography from './Typography';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Dimensions
} from 'react-native';

import { BRAND_BLUE, LIGHT_GREY } from '../constants/colors';

interface IProps {
  selected: boolean;
  onPress?: TouchableOpacityProps['onPress'];
  fullWidth?: boolean;
}

const ScheduleMonthItem: React.SFC<IProps> = ({
  children,
  selected,
  onPress,
  fullWidth
}) => {
  return (
    <View
      style={[
        styles.gutters,
        fullWidth && { width: Dimensions.get('screen').width }
      ]}
    >
      <TouchableOpacity onPress={onPress} disabled={selected}>
        <Typography style={[styles.text, styles.selected, styles.invisible]}>
          {children}
        </Typography>
        <Typography
          style={[styles.floating, styles.text, selected && styles.selected]}
        >
          {children}
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 42,
    fontWeight: '300',
    color: LIGHT_GREY
  },
  gutters: {
    marginRight: 18
  },
  floating: {
    position: 'absolute'
  },
  invisible: {
    color: 'transparent'
  },
  selected: {
    fontWeight: '700',
    color: BRAND_BLUE
  }
});

export default ScheduleMonthItem;
