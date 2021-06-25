import * as React from 'react';
import {
  StyleSheet,
  View,
  LayoutChangeEvent,
  ViewStyle,
  StyleProp,
  StatusBar
} from 'react-native';

import Logo, { svgHeight, svgWidth } from './Logo';
import OnboardingContainer from './OnboardingContainer';

interface IProps {
  contentStyle?: StyleProp<ViewStyle>;
}

const GenericLogoView: React.SFC<IProps> = ({ children, contentStyle }) => {
  StatusBar.setBarStyle('light-content');
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  const handleLayoutChange = React.useCallback((e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width
    });
  }, []);

  const width = 0.85 * dimensions.width;
  const height = (width / svgWidth) * svgHeight;

  return (
    <OnboardingContainer onLayout={handleLayoutChange}>
      <View style={styles.logoContainer}>
        <Logo width={width} height={height} fill="#FFF" />
      </View>
      <View style={[styles.content, contentStyle]}>{children}</View>
    </OnboardingContainer>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flex: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '50%'
  },
  content: {
    flex: 1
  }
});

export default GenericLogoView;
