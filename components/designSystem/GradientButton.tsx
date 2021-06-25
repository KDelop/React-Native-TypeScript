import * as React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {MaterialIndicator} from 'react-native-indicators';

import Card, {IProps as ICardProps} from './Card';
import Padded, {IProps as IPaddedProps} from './Padded';
import Typography from './Typography';

interface IProps extends TouchableOpacityProps {
  children?: string;
  color?: ICardProps['color'];
  paddingSize?: IPaddedProps['size'];
  spinning?: boolean;
}

const GradientButton: React.FunctionComponent<IProps> = ({
  children,
  color = 'red',
  paddingSize = {top: 5, bottom: 5},
  spinning,
  ...rest
}) => {
  return (
    <TouchableOpacity delayPressIn={0} {...rest}>
      <Card color={color} borderRadiusSize="small">
        <Padded size={paddingSize} style={styles.textContainer}>
          <Typography
            style={{textAlign: 'center'}}
            variant="gradientButtonText">
            {children}
          </Typography>
          {spinning && (
            <MaterialIndicator
              color="white"
              size={18}
              style={styles.materialIndicator}
            />
          )}
        </Padded>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  materialIndicator: {
    flex: 0,
    marginLeft: 12,
  },
});

export default GradientButton;
