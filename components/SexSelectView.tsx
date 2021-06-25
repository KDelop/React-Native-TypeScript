import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

import Typography from './Typography';
import OnboardingContainer from './OnboardingContainer';
import TransparentButton from './TransparentButton';

const SexSelectView: React.SFC = () => {
  const { navigate } = useNavigation();

  const handleSexSelectOnPress = React.useCallback((sex: string) => {
    navigate('StatsSelect');
  }, []);

  return (
    <OnboardingContainer>
      <View style={styles.content}>
        <View style={styles.headingContainer}>
          <Typography style={styles.heading} gutterBottom>
            TELL US ABOUT YOURSELF
          </Typography>
        </View>
        <View style={styles.formContainer}>
          <TransparentButton
            TouchableOpacityProps={{
              onPress: () => handleSexSelectOnPress('male')
            }}
            gutterBottom
          >
            Male
          </TransparentButton>
          <TransparentButton
            TouchableOpacityProps={{
              onPress: () => handleSexSelectOnPress('female')
            }}
          >
            Female
          </TransparentButton>
        </View>
      </View>
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

export default SexSelectView;
