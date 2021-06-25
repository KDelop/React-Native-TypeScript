import * as React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';

import OnboardingContainer from './OnboardingContainer';
import Typography from './Typography';
import { FormInput } from './FormInput';
import GradientButton from './GradientButton';
import { forgotPassword } from '../clients/auth';

const ForgotPasswordView: React.SFC = () => {
  const { navigate } = useNavigation();
  const [email, setEmail] = React.useState('');

  const handleForgotPasswordOnPress = React.useCallback(async () => {
    try {
      await forgotPassword(email);
      navigate('ConfirmForgotPassword', { username: email });
    } catch (e) {
      console.log(e);
    }
  }, [email]);

  return (
    <OnboardingContainer>
      <KeyboardAvoidingView style={styles.content} behavior="padding" enabled>
        <View style={styles.headingContainer}>
          <Typography style={styles.heading} gutterBottom>
            FORGOT PASSWORD?
          </Typography>
        </View>
        <View style={styles.form}>
          <FormInput
            placeholder="Email"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
            gutterBottom
            value={email}
            onChangeText={setEmail}
          />
          <GradientButton
            TouchableOpacityProps={{ onPress: handleForgotPasswordOnPress }}
          >
            NEXT
          </GradientButton>
          <View style={styles.signupText}>
            <Typography variant="info">
              Don't have an account? Signup
            </Typography>
          </View>
        </View>
      </KeyboardAvoidingView>
    </OnboardingContainer>
  );
};

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center'
  },
  headingContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  content: {
    height: '100%'
  },
  signupText: {
    flex: 1,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5%',
    height: '50%'
  }
});

export default ForgotPasswordView;
