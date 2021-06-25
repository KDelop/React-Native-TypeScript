import * as React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';

import OnboardingContainer from './OnboardingContainer';
import Typography from './Typography';
import { FormInput } from './FormInput';
import GradientButton from './GradientButton';
import { signIn } from '../clients/auth';

const LoginView: React.SFC = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { navigate } = useNavigation();

  const handleForgotPasswordOnPress = React.useCallback(() => {
    navigate('ForgotPassword');
  }, []);

  const handleSignupOnPress = React.useCallback(() => {
    navigate('SignUp');
  }, []);

  const handleLoginOnPress = React.useCallback(async () => {
    if (username && password) {
      try {
        await signIn({ username: username, password });
        navigate('Dashboard');
      } catch (e) {
        console.error(e);
      }
    }
  }, [username, password]);

  return (
    <OnboardingContainer>
      <KeyboardAvoidingView style={styles.content} behavior="padding" enabled>
        <View style={styles.headingContainer}>
          <Typography gutterBottom>LOGIN</Typography>
          {/* <Typography style={styles.captionText} variant="caption">
            {error}
          </Typography> */}
        </View>
        <View style={styles.form}>
          <FormInput
            placeholder="Email"
            borderBottom
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
          />
          <FormInput
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            gutterBottom
            secureTextEntry
            spellCheck={false}
          />
          <GradientButton
            TouchableOpacityProps={{ onPress: handleLoginOnPress }}
          >
            Login
          </GradientButton>
          <TouchableOpacity
            style={styles.signupText}
            onPress={handleForgotPasswordOnPress}
          >
            <Typography variant="info">
              Trouble signing in? Forgot Password
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signupText}
            onPress={handleSignupOnPress}
          >
            <Typography variant="info">
              Don't have an account? Signup
            </Typography>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </OnboardingContainer>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  content: {
    height: '100%'
  },
  captionText: {
    textAlign: 'center',
    width: '90%',
    fontWeight: '400'
  },
  signupText: {
    flex: 1,
    minHeight: 40,
    maxHeight: '30%',
    justifyContent: 'center'
  },
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5%',
    height: '50%'
  }
});

export default LoginView;
