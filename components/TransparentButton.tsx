import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps
} from 'react-native';

interface IProps {
  gutterBottom?: boolean;
  TouchableOpacityProps?: TouchableOpacityProps;
}

const TransparentButton: React.SFC<IProps> = ({
  children,
  gutterBottom,
  TouchableOpacityProps
}) => {
  return (
    <View style={[styles.container, gutterBottom && styles.gutterBottom]}>
      <TouchableOpacity style={styles.button} {...TouchableOpacityProps}>
        <Text style={styles.text}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: '100%',
    height: 55
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontFamily: 'Roboto',
    color: '#FFF',
    textTransform: 'uppercase',
    fontWeight: '500',
    letterSpacing: 3,
    fontSize: 18
  },
  gutterBottom: {
    marginBottom: 8
  }
});

export default TransparentButton;
