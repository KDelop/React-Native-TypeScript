import * as React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from 'react-navigation-hooks';

import OnboardingContainer from './OnboardingContainer';
import Typography from './Typography';
import { FormInput, FormInputMask } from './FormInput';
import { signUp } from '../clients/auth';
import GradientButton from './GradientButton';

const SignUpView: React.SFC = () => {
  const { navigate } = useNavigation();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('');

  const handleLoginOnPress = React.useCallback(() => {
    navigate('Login');
  }, []);

  const handleSignUpOnPress = React.useCallback(async () => {
    if (username && name && password && dateOfBirth) {
      try {
        await signUp({
          username,
          password,
          name,
          dateOfBirth
        });
        navigate('ConfirmSignUp', { username, password });
      } catch (e) {
        console.log(e);
      }
    }
  }, [username, name, password, dateOfBirth]);

  return (
    <OnboardingContainer>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        scrollEnabled
        enableAutomaticScroll
        extraScrollHeight={80}
      >
        <View style={styles.content}>
          <View style={styles.headingContainer}>
            <Typography gutterBottom>JOIN NOW</Typography>
          </View>
          <View style={styles.form}>
            <FormInput
              placeholder="Name"
              borderBottom
              value={name}
              onChangeText={setName}
              textContentType="name"
            />
            <FormInput
              placeholder="Email"
              borderBottom
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              onChangeText={setUsername}
              value={username}
            />
            <FormInput
              placeholder="Password"
              borderBottom
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />
            <FormInputMask
              type="datetime"
              options={{
                format: 'MM/DD/YYYY'
              }}
              placeholder="Date of Birth"
              gutterBottom
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
            />
            <GradientButton
              TouchableOpacityProps={{ onPress: handleSignUpOnPress }}
            >
              Sign Up
            </GradientButton>
            <TouchableOpacity
              style={styles.loginText}
              onPress={handleLoginOnPress}
            >
              <Typography variant="info">
                Already have an accout? Login
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </OnboardingContainer>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    flex: 0,
    height: '30%',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  content: {
    height: '100%'
  },
  captionText: {
    textAlign: 'center',
    width: '90%',
    fontWeight: '400',
    fontSize: 16
  },
  loginText: {
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
    height: '70%'
  },
  dateTimePickerButton: {
    width: '100%',
    backgroundColor: 'red'
  }
});

export default SignUpView;
