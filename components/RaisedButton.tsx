import * as React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TouchableOpacityProps
} from 'react-native';

import Card, { IProps as ICardProps } from './Card';
import { BRAND_BLUE } from '../constants/colors';

interface IProps extends TouchableOpacityProps {
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
  cardProps?: ICardProps;
}

const RaisedButton: React.SFC<IProps> = ({
  leftAdornment,
  rightAdornment,
  children,
  cardProps,
  ...rest
}) => {
  return (
    <TouchableOpacity {...rest}>
      <Card borderRadiusSize="small" style={styles.card} {...cardProps}>
        {leftAdornment && (
          <View style={styles.leftAdornment}>{leftAdornment}</View>
        )}
        <Text
          style={[
            styles.buttonText,
            (cardProps?.color === 'red' || cardProps?.color === 'blue') &&
              styles.buttonTextWhite
          ]}
        >
          {children}
        </Text>
        {rightAdornment && (
          <View style={styles.rightAdornment}>{rightAdornment}</View>
        )}
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 0,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonTextWhite: {
    color: '#FFF'
  },
  buttonText: {
    fontSize: 16,
    color: BRAND_BLUE,
    textTransform: 'uppercase',
    fontStyle: 'italic',
    fontWeight: '800'
  },
  leftAdornment: {
    marginRight: 10
  },
  rightAdornment: {
    marginLeft: 10
  }
});

export default RaisedButton;
