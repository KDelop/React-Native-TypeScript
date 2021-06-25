import * as React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Padded from './Padded';
import Typography from './Typography';

interface IProps {
  fontSize?: number;
}

const Badge: React.FunctionComponent<IProps> = ({children, fontSize}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      colors={['#1c2947', '#a5181c']}
      style={styles.root}>
      <Padded size={{top: 0.5, bottom: 0.5, left: 1, right: 1}}>
        <Typography
          variant="gradientBadgeText"
          style={fontSize !== undefined && {fontSize}}>
          {children}
        </Typography>
      </Padded>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  root: {
    borderRadius: 4,
  },
});

export default Badge;
