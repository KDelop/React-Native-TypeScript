import * as React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { Text, View, StyleSheet } from 'react-native';

import GenericLogoView from './GenericLogoView';
import GradientButton from './GradientButton';

const WelcomeView: React.SFC = () => {
  const { navigate } = useNavigation();

  const handleLoginOnPress = React.useCallback(() => navigate('Login'), []);
  const handleSignUpOnPress = React.useCallback(() => navigate('SignUp'), []);

  return (
    <GenericLogoView>
      <View style={styles.buttonContainer}>
        <GradientButton
          variant="oval"
          TouchableOpacityProps={{ onPress: handleLoginOnPress }}
          gutterBottom
        >
          Login
        </GradientButton>
        <GradientButton
          variant="oval"
          TouchableOpacityProps={{ onPress: handleSignUpOnPress }}
        >
          Signup
        </GradientButton>
      </View>
    </GenericLogoView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: '15%',
    marginLeft: '5%',
    marginRight: '5%'
  }
});

export default WelcomeView;
