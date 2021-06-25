import * as React from 'react';
import { useNavigation } from 'react-navigation-hooks';

import OnboardingContainer from './OnboardingContainer';
import { FormInput } from './FormInput';
import { confirmSignUp, signIn } from '../clients/auth';
import GradientButton from './GradientButton';

const ConfirmSignUpView: React.SFC = () => {
  const [code, setCode] = React.useState('');
  const {
    navigate,
    state: { params }
  } = useNavigation();

  const handleConfirmSignUp = React.useCallback(async () => {
    if (code) {
      try {
        const { username, password } = params;
        await confirmSignUp({ username, code });
        await signIn({ username, password });
        navigate('Dashboard');
      } catch (e) {
        console.error(e);
      }
    }
  }, [code]);

  return (
    <OnboardingContainer>
      <FormInput
        placeholder="Code"
        borderBottom
        spellCheck={false}
        autoCapitalize="none"
        value={code}
        onChangeText={setCode}
      />
      <GradientButton TouchableOpacityProps={{ onPress: handleConfirmSignUp }}>
        Confirm
      </GradientButton>
    </OnboardingContainer>
  );
};

export default ConfirmSignUpView;
