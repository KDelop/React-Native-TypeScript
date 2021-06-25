import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {StyleSheet, TouchableOpacityProps} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {BRAND_BLUE} from '../colors';
import Typography from './Typography';

interface IProps extends TouchableOpacityProps {
  color?: string;
}

const BackButton: React.FunctionComponent<IProps> = ({
  children,
  color,
  ...other
}) => {
  return (
    <TouchableOpacity delayPressIn={0} style={styles.backButton} {...other}>
      <FeatherIcon
        name="chevron-left"
        color={color || BRAND_BLUE}
        size={22}
        style={styles.backButtonIcon}
      />
      <Typography style={styles.backButtonText} color={color}>
        {children || 'Back'}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    color: BRAND_BLUE,
  },
  backButtonIcon: {
    marginLeft: -5,
  },
});

export default BackButton;
