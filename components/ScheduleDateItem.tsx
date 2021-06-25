import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import Typography from './Typography';
import { BRAND_BLUE, LIGHT_GREY } from '../constants/colors';

export const DATE_ITEM_WIDTH = 78;

interface IProps {
  selected: boolean;
  subtitle?: React.ReactNode;
  onPress(): void;
}

const ScheduleDateItem: React.SFC<IProps> = ({
  children,
  selected,
  subtitle,
  onPress
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={selected}>
      <View style={[styles.container]}>
        <Typography style={[styles.text, selected && styles.selected]}>
          {children}
        </Typography>
        {subtitle && (
          <Typography
            style={[styles.text, styles.subtitle, selected && styles.selected]}
          >
            {subtitle}
          </Typography>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 14,
    textAlign: 'center'
  },
  selected: {
    color: BRAND_BLUE,
    fontWeight: '500'
  },
  text: {
    fontWeight: '500',
    textAlign: 'center',
    color: LIGHT_GREY,
    fontSize: 26,
    fontStyle: 'normal'
  },
  container: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: DATE_ITEM_WIDTH
  }
});

export default ScheduleDateItem;
