import * as React from 'react';
import { View, Image, StyleSheet, ViewProps } from 'react-native';

import AppContainer from './AppContainer';

interface IProps extends ViewProps {}

const OnboardingContainer: React.SFC<IProps> = ({ children, ...props }) => (
  <AppContainer {...props}>
    <Image
      style={styles.background}
      source={require('../assets/images/welcome.png')}
    />
    {children}
  </AppContainer>
);

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
});

export default OnboardingContainer;
