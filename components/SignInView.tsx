import React from 'react';
import Toast from 'react-native-toast-message';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import useSignIn from '../hooks/useSignIn';
import FormInput from './designSystem/FormInput';
import GradientButton from './designSystem/GradientButton';
import Padded from './designSystem/Padded';
import Typography from './designSystem/Typography';
import OnboardingView from './OnboardingView';
import {RootStackParamList} from '../types';

const SignInView = () => {
  const {params} = useRoute<RouteProp<RootStackParamList, 'SignIn'>>();
  const passwordFieldRef = React.useRef<TextInput>(null);
  const [form, setForm] = React.useState({
    email: '',
    password: '',
  });
  const {navigate} = useNavigation();
  const [signInResp, signIn] = useSignIn();

  const validate = (successCb: (input: typeof form) => void) => () => {
    if (form.email.length === 0 || form.password.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Form Empty',
        text2: 'Enter your email and password below',
      });
    } else {
      successCb(form);
    }
  };

  const updateFormValue = (
    key: keyof typeof form,
    value: typeof form[typeof key],
  ) => setForm((x) => ({...x, [key]: value}));

  React.useEffect(() => {
    if (params?.resetPassword) {
      Toast.show({
        type: 'error',
        text1: 'Email Sent',
        text2: 'Check your email for password reset instructions',
      });
    }
  }, [params?.resetPassword]);

  return (
    <OnboardingView>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior="padding"
        enabled>
        <Padded size={{bottom: 8}} style={styles.titleContainer}>
          <Typography variant="onboardingTitle">LOGIN</Typography>
        </Padded>
        <Padded size={{bottom: 15, left: 3, right: 3}}>
          <FormInput
            top
            autoFocus
            placeholder="Email"
            onChangeText={(val) => updateFormValue('email', val)}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCompleteType="email"
            autoCorrect={false}
            spellCheck={false}
            returnKeyType="next"
            onSubmitEditing={() => passwordFieldRef.current?.focus?.()}
            borderBottom
          />
          <FormInput
            bottom
            ref={passwordFieldRef}
            placeholder="Password"
            secureTextEntry
            onChangeText={(val) => updateFormValue('password', val)}
            returnKeyType="done"
            onSubmitEditing={validate(signIn)}
          />
          <Padded size={{top: 3, bottom: 12}}>
            <GradientButton
              disabled={signInResp.status === 'loading'}
              spinning={signInResp.status === 'loading'}
              onPress={validate(signIn)}>
              Login
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
              Trouble signing in?{' '}
              <TouchableOpacity
                delayPressIn={0}
                onPress={() => navigate('ResetPassword')}>
                <Typography variant="onboardingFooterLink">
                  Reset your password
                </Typography>
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
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default SignInView;
