import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  View,
} from 'react-native';

import Card, {IProps as ICardProps} from './Card';
import Padded from './Padded';
import Typography from './Typography';

export interface IProps extends TouchableOpacityProps {
  backgroundColor?: string;
  cardColor?: ICardProps['color'];
  diameter?: number;
  label?: React.ReactNode;
  disableDropShadow?: boolean;
}

const RoundActionButton: React.FunctionComponent<IProps> = ({
  children,
  diameter = 50,
  backgroundColor = 'white',
  cardColor,
  disableDropShadow = false,
  label,
  ...rest
}) => {
  return (
    <TouchableOpacity delayPressIn={0} style={styles.root} {...rest}>
      <Card
        color={cardColor}
        disableDropShadow={disableDropShadow}
        style={[
          styles.card,
          {
            height: diameter,
            width: diameter,
            borderTopLeftRadius: diameter / 2,
            borderBottomLeftRadius: diameter / 2,
            borderTopRightRadius: diameter / 2,
            borderBottomRightRadius: diameter / 2,
          },
          {backgroundColor: cardColor ? 'transparent' : backgroundColor},
        ]}>
        <View style={rest.disabled && styles.disabled}>{children}</View>
      </Card>
      {label && (
        <Padded size={{top: 4}}>
          <Typography style={styles.label} variant="roundActionButtonLabel">
            {label}
          </Typography>
        </Padded>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.3,
  },
  root: {
    flex: 0,
    alignItems: 'center',
  },
  card: {
    elevation: 0,
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {},
});

export default RoundActionButton;
