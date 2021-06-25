import * as React from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

import Typography from './Typography';
import OnboardingContainer from './OnboardingContainer';
import { FormInput } from './FormInput';
import GradientButton from './GradientButton';

const ExpertiseSelectView: React.SFC = () => {
  const { navigate } = useNavigation();

  const handleNextOnPress = React.useCallback(() => {
    navigate('Dashboard');
  }, []);

  return (
    <OnboardingContainer>
      <KeyboardAvoidingView style={styles.content} behavior="padding" enabled>
        <View style={styles.headingContainer}>
          <Typography style={styles.heading} gutterBottom>
            YOUR AREA OF EXPERTISE
          </Typography>
        </View>
        <View style={styles.formContainer}>
          <FormInput placeholder="IE. Personal Trainer C.S.C.S" gutterBottom />
          <GradientButton
            TouchableOpacityProps={{ onPress: handleNextOnPress }}
          >
            Next
          </GradientButton>
        </View>
      </KeyboardAvoidingView>
    </OnboardingContainer>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '85%'
  },
  heading: {
    textAlign: 'center',
    fontSize: 30
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    width: '85%'
  },
  formContainer: {
    flex: 1,
    paddingTop: '20%',
    alignItems: 'center',
    width: '85%'
  }
});

export default ExpertiseSelectView;
