import * as React from 'react';
import { useNavigation } from 'react-navigation-hooks';

import OnboardingContainer from './OnboardingContainer';
import { FormInput } from './FormInput';
import { forgotPasswordSubmit } from '../clients/auth';
import GradientButton from './GradientButton';

const EnterNewPasswordView: React.SFC = () => {
  const [password, setPassword] = React.useState('');
  const {
    state: { params },
    navigate
  } = useNavigation();

  const handleConfirmOnPress = React.useCallback(async () => {
    if (password) {
      try {
        const { username, code } = params;
        await forgotPasswordSubmit({ username, code, password });
        navigate('Login');
      } catch (e) {
        console.error(e);
      }
    }
  }, [password]);

  return (
    <OnboardingContainer>
      <FormInput
        placeholder="New Password"
        secureTextEntry
        borderBottom
        spellCheck={false}
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
      />
      <GradientButton TouchableOpacityProps={{ onPress: handleConfirmOnPress }}>
        Confirm
      </GradientButton>
    </OnboardingContainer>
  );
};

export default EnterNewPasswordView;
