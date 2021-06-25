import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Logo from './Logo';
import Card from './designSystem/Card';
import Typography from './designSystem/Typography';
import Padded from './designSystem/Padded';
import OnboardingView from './OnboardingView';

const WelcomeView = () => {
  const {navigate} = useNavigation();

  return (
    <OnboardingView>
      <View style={styles.logoContainer}>
        <Logo fill="white" />
      </View>
      <View style={styles.actionsContainer}>
        <Card style={styles.splitButton} color="red" borderRadiusSize="none">
          <Padded
            style={styles.buttonContainer}
            size={{top: 5.5, right: 10, bottom: 5.5}}>
            <TouchableOpacity
              delayPressIn={0}
              onPress={() => navigate('SignUp')}>
              <Typography
                style={{textAlign: 'right'}}
                variant="gradientButtonText">
                Join Now
              </Typography>
            </TouchableOpacity>
          </Padded>
          <View style={styles.verticalRule} />
          <Padded
            style={styles.buttonContainer}
            size={{top: 5.5, left: 10, bottom: 5.5}}>
            <TouchableOpacity
              delayPressIn={0}
              onPress={() => navigate('SignIn')}>
              <Typography variant="gradientButtonText">Login</Typography>
            </TouchableOpacity>
          </Padded>
        </Card>
      </View>
    </OnboardingView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flex: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '50%',
  },
  verticalRule: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.30)',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    flexGrow: 1,
  },
  splitButton: {
    width: '100%',
    flex: 0,
    flexDirection: 'row',
  },
  actionsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default WelcomeView;
