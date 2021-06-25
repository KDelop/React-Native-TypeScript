import React from 'react';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAvoidingView, StyleSheet, TouchableOpacity} from 'react-native';

import FormInput from './designSystem/FormInput';
import GradientButton from './designSystem/GradientButton';
import Padded from './designSystem/Padded';
import Typography from './designSystem/Typography';
import OnboardingView from './OnboardingView';
import useResetPassword from '../hooks/usePasswordReset';

const ResetPasswordView = () => {
  const [form, setForm] = React.useState({
    email: '',
  });
  const [resetPasswordResp, resetPassword] = useResetPassword();
  const {navigate} = useNavigation();

  const validate = (successCb: (input: typeof form) => void) => () => {
    if (form.email.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Email Required',
        text2: 'Please enter your email below',
      });
    } else {
      successCb(form);
    }
  };

  const updateFormValue = (key: keyof typeof form, value: string) =>
    setForm((x) => ({...x, [key]: value}));

  return (
    <OnboardingView>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior="padding"
        enabled>
        <Padded size={{bottom: 8}} style={styles.titleContainer}>
          <Typography variant="onboardingTitle">RESET</Typography>
          <Typography variant="onboardingTitle">PASSWORD</Typography>
        </Padded>
        <Padded size={{bottom: 15, left: 3, right: 3}}>
          <FormInput
            top
            autoFocus
            placeholder="Email"
            onChangeText={(val) => updateFormValue('email', val)}
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            autoCompleteType="email"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <Padded size={{top: 3, bottom: 12}}>
            <GradientButton
              onPress={validate(resetPassword)}
              spinning={resetPasswordResp.status === 'loading'}
              disabled={resetPasswordResp.status === 'loading'}>
              Send Reset Email
            </GradientButton>
          </Padded>
          <Typography style={styles.footerText} variant="onboardingFooter">
            Dont have an account?{' '}
            <TouchableOpacity
              delayPressIn={0}
              onPress={() => navigate('SignUp')}>
              <Typography variant="onboardingFooterLink">Sign up</Typography>
            </TouchableOpacity>
          </Typography>
          <Padded size={{top: 1}}>
            <Typography style={styles.footerText} variant="onboardingFooter">
              Already have an account?{' '}
              <TouchableOpacity
                delayPressIn={0}
                onPress={() => navigate('SignIn')}>
                <Typography variant="onboardingFooterLink">Login</Typography>
              </TouchableOpacity>
            </Typography>
          </Padded>
        </Padded>
      </KeyboardAvoidingView>
    </OnboardingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {flex: 1, justifyContent: 'center'},
  footerText: {
    textAlign: 'center',
  },
  titleContainer: {
    alignItems: 'center',
  },
});

export default ResetPasswordView;
