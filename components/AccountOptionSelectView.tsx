import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

import OnboardingContainer from './OnboardingContainer';
import Typography from './Typography';
import TransparentButton from './TransparentButton';

const AccountOptionSelectView: React.SFC = () => {
  const { navigate } = useNavigation();

  const handleHealthProOnPress = React.useCallback(() => {
    navigate('ExpertiseSelect');
  }, []);

  const handleAthleteOnPress = React.useCallback(() => {
    navigate('Dashboard');
  }, []);

  return (
    <OnboardingContainer>
      <View style={styles.content}>
        <View style={styles.headingContainer}>
          <Typography style={styles.heading} gutterBottom>
            SELECT AN ACCOUNT OPTION
          </Typography>
        </View>
        <View style={styles.buttonContainer}>
          <TransparentButton
            TouchableOpacityProps={{ onPress: handleAthleteOnPress }}
            gutterBottom
          >
            Athlete
          </TransparentButton>
          <TransparentButton
            TouchableOpacityProps={{ onPress: handleHealthProOnPress }}
          >
            Health Pro
          </TransparentButton>
        </View>
      </View>
    </OnboardingContainer>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '85%'
  },
  heading: {
    textAlign: 'center',
    fontSize: 30
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    width: '85%'
  },
  buttonContainer: {
    flex: 1,
    paddingTop: '20%',
    alignItems: 'center',
    width: '85%'
  }
});

export default AccountOptionSelectView;
