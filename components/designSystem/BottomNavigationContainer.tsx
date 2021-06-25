import * as React from 'react';
import {StyleSheet, View} from 'react-native';

export const CONTAINER_HEIGHT = 65;

const BottomNavigationContainer = React.forwardRef<
  View,
  React.PropsWithChildren<React.ComponentPropsWithoutRef<typeof View>>
>(({style, ...rest}, ref) => {
  return <View ref={ref} style={[styles.root, style]} {...rest} />;
});

const styles = StyleSheet.create({
  root: {
    bottom: 0,
    width: '100%',
    position: 'absolute',
    paddingRight: '2.5%',
    paddingLeft: '2.5%',
    backgroundColor: 'white',
    shadowOffset: {height: -6, width: 0},
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    zIndex: 10,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: CONTAINER_HEIGHT,
  },
});

export default BottomNavigationContainer;
