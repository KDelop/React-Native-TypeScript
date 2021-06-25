import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import OnboardingContainer from './OnboardingContainer';
import GradientButton from './GradientButton';
import Typography from './Typography';
import UploadAvatar from './UploadAvatar';

const GetStartedView: React.SFC = () => (
  <OnboardingContainer>
    <View style={styles.avatarContainer}>
      <UploadAvatar firstName="SARAH" />
    </View>
    <View style={styles.textContainer}>
      <Typography style={styles.heading} gutterBottom>
        LETS GO!
      </Typography>
      <Typography style={styles.text} variant="caption">
        It's time to start simplfiying the way you manage your health and
        maximize your performance. Coordinate with your health team in one
        place.
      </Typography>
    </View>
    <GradientButton>Get Started</GradientButton>
  </OnboardingContainer>
);

const styles = StyleSheet.create({
  avatarContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 24
  },
  heading: {
    textAlign: 'center',
    width: '85%'
  },
  textContainer: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    width: '85%'
  }
});

export default GetStartedView;
