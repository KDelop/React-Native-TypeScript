import * as React from 'react';
import { useNavigation } from 'react-navigation-hooks';

import OnboardingContainer from './OnboardingContainer';
import { FormInput } from './FormInput';
import GradientButton from './GradientButton';

const ConfirmForgotPasswordView: React.SFC = () => {
  const [code, setCode] = React.useState('');
  const {
    state: { params },
    navigate
  } = useNavigation();

  const handleConfirmOnPress = React.useCallback(async () => {
    if (code) {
      try {
        const { username } = params;
        navigate('EnterNewPassword', { username, code });
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
      <GradientButton TouchableOpacityProps={{ onPress: handleConfirmOnPress }}>
        Confirm
      </GradientButton>
    </OnboardingContainer>
  );
};

export default ConfirmForgotPasswordView;
