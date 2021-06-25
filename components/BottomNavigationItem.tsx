import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';

import Typography from './Typography';

interface IProps extends TouchableOpacityProps {
  icon: React.ReactNode;
  text: string;
}

const BottomNavigationItem: React.SFC<IProps> = ({ icon, text, ...rest }) => {
  return (
    <TouchableOpacity style={styles.root} {...rest}>
      <View style={styles.icon}>{icon}</View>
      <Typography style={styles.text} variant="title">
        {text}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 0,
    paddingLeft: 10,
    paddingRight: 10,
    height: '100%',
    paddingTop: 10,
    paddingBottom: 12
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'none'
  },
  icon: {
    flex: 1,
    alignItems: 'center'
  }
});

export default BottomNavigationItem;
