import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {StyleSheet, Switch, TextInput, TouchableOpacity} from 'react-native';
import PickerSelect from 'react-native-picker-select';

import FormInput from './designSystem/FormInput';
import GradientButton from './designSystem/GradientButton';
import Padded from './designSystem/Padded';
import Typography from './designSystem/Typography';
import OnboardingView from './OnboardingView';
import useSignUp from '../hooks/useSignUp';
import {ICreateAccountArgs} from '../types';
import {BRAND_BLUE, MESSAGE_BUBBLE_GREY} from './colors';
import FormSelectInput from './designSystem/FormSelectInput';

const STATES = [
  {label: 'Alabama', value: 'AL'},
  {label: 'Alaska', value: 'AK'},
  {label: 'American Samoa', value: 'AS'},
  {label: 'Arizona', value: 'AZ'},
  {label: 'Arkansas', value: 'AR'},
  {label: 'California', value: 'CA'},
  {label: 'Colorado', value: 'CO'},
  {label: 'Connecticut', value: 'CT'},
  {label: 'Delaware', value: 'DE'},
  {label: 'District of Columbia', value: 'DC'},
  {label: 'States of Micronesia', value: 'FM'},
  {label: 'Florida', value: 'FL'},
  {label: 'Georgia', value: 'GA'},
  {label: 'Guam', value: 'GU'},
  {label: 'Hawaii', value: 'HI'},
  {label: 'Idaho', value: 'ID'},
  {label: 'Illinois', value: 'IL'},
  {label: 'Indiana', value: 'IN'},
  {label: 'Iowa', value: 'IA'},
  {label: 'Kansas', value: 'KS'},
  {label: 'Kentucky', value: 'KY'},
  {label: 'Louisiana', value: 'LA'},
  {label: 'Maine', value: 'ME'},
  {label: 'Marshall Islands', value: 'MH'},
  {label: 'Maryland', value: 'MD'},
  {label: 'Massachusetts', value: 'MA'},
  {label: 'Michigan', value: 'MI'},
  {label: 'Minnesota', value: 'MN'},
  {label: 'Mississippi', value: 'MS'},
  {label: 'Missouri', value: 'MO'},
  {label: 'Montana', value: 'MT'},
  {label: 'Nebraska', value: 'NE'},
  {label: 'Nevada', value: 'NV'},
  {label: 'New Hampshire', value: 'NH'},
  {label: 'New Jersey', value: 'NJ'},
  {label: 'New Mexico', value: 'NM'},
  {label: 'New York', value: 'NY'},
  {label: 'North Carolina', value: 'NC'},
  {label: 'North Dakota', value: 'ND'},
  {label: 'Northern Mariana Islands', value: 'MP'},
  {label: 'Ohio', value: 'OH'},
  {label: 'Oklahoma', value: 'OK'},
  {label: 'Oregan', value: 'OR'},
  {label: 'Palau', value: 'PW'},
  {label: 'Pennsilvania', value: 'PA'},
  {label: 'Puerto Rico', value: 'PR'},
  {label: 'Rhode Island', value: 'RI'},
  {label: 'South Carolina', value: 'SC'},
  {label: 'South Dakota', value: 'SD'},
  {label: 'Tennessee', value: 'TN'},
  {label: 'Texas', value: 'TX'},
  {label: 'Utah', value: 'UT'},
  {label: 'Vermont', value: 'VT'},
  {label: 'Virgin Islands', value: 'VI'},
  {label: 'Virginia', value: 'VA'},
  {label: 'Washington', value: 'WA'},
  {label: 'West Virginia', value: 'WV'},
  {label: 'Wisconsin', value: 'WI'},
  {label: 'Wyoming', value: 'WY'},
];

const SignInView = () => {
  const {navigate} = useNavigation();
  const [signUpResp, signUp] = useSignUp();
  const emailFieldRef = React.useRef<TextInput>(null);
  const passwordFieldRef = React.useRef<TextInput>(null);
  const cityFieldRef = React.useRef<TextInput>(null);
  const stateFieldRef = React.useRef<PickerSelect>(null);

  const [form, setForm] = React.useState<ICreateAccountArgs>({
    fullName: '',
    city: '',
    state: '',
    email: '',
    password: '',
    country: 'USA',
    isPro: false,
  });

  const validate = (successCb: (input: typeof form) => void) => () => {
    if (
      form.fullName.length === 0 ||
      form.city.length === 0 ||
      form.state.length === 0 ||
      form.email.length === 0 ||
      form.password.length === 0
    ) {
      Toast.show({
        type: 'error',
        text1: 'Almost Done!',
        text2: 'All fields are required below',
      });
    } else if (
      form.fullName.trim().trim().replace(/\s+/g, ' ').split(' ').length !== 2
    ) {
      Toast.show({
        type: 'error',
        text1: 'Full Name',
        text2: 'Please enter your full name i.e "John Smith"',
      });
    } else {
      successCb(form);
    }
  };

  const updateFormValue = (
    key: keyof typeof form,
    value: typeof form[typeof key],
  ) => setForm((x) => ({...x, [key]: value}));

  return (
    <OnboardingView>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.keyboardAvoidingView}>
        <Padded size={{bottom: 8}} style={styles.titleContainer}>
          <Typography variant="onboardingTitle">Sign Up</Typography>
        </Padded>
        <Padded size={{bottom: 15, left: 3, right: 3}}>
          <FormInput
            top
            autoFocus
            onChangeText={(val) => updateFormValue('fullName', val)}
            placeholder="Full Name"
            borderBottom
            textContentType="name"
            value={form.fullName}
            returnKeyType="next"
            onSubmitEditing={() => emailFieldRef.current?.focus?.()}
          />
          <FormInput
            ref={emailFieldRef}
            onChangeText={(val) => updateFormValue('email', val)}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCompleteType="email"
            autoCorrect={false}
            spellCheck={false}
            returnKeyType="next"
            onSubmitEditing={() => passwordFieldRef.current?.focus?.()}
            borderBottom
            value={form.email}
          />
          <FormInput
            ref={passwordFieldRef}
            onChangeText={(val) => updateFormValue('password', val)}
            placeholder="Password"
            returnKeyType="next"
            onSubmitEditing={() => cityFieldRef.current?.focus?.()}
            value={form.password}
            secureTextEntry
            borderBottom
          />
          <FormInput
            ref={cityFieldRef}
            onChangeText={(val) => updateFormValue('city', val)}
            value={form.city}
            placeholder="City"
            returnKeyType="next"
            onSubmitEditing={() => stateFieldRef.current?.togglePicker?.()}
            borderBottom
          />
          <FormSelectInput
            ref={stateFieldRef}
            onValueChange={(val) => updateFormValue('state', val)}
            items={STATES}
            value={form.state}
            placeholder="State"
            bottom
          />
          <Padded size={{top: 3}} style={styles.healthProField}>
            <Typography variant="onboardingFooter">
              Are you a Health Pro?
            </Typography>
            <Switch
              onValueChange={(val) => updateFormValue('isPro', val)}
              value={form.isPro}
              trackColor={{
                true: BRAND_BLUE,
                false: MESSAGE_BUBBLE_GREY,
              }}
            />
          </Padded>
          <Padded size={{top: 3, bottom: 12}}>
            <GradientButton
              onPress={validate(signUp)}
              spinning={signUpResp.status === 'loading'}>
              Sign Up
            </GradientButton>
          </Padded>
          <Typography style={styles.footerText} variant="onboardingFooter">
            Already have an account?{' '}
            <TouchableOpacity
              delayPressIn={0}
              onPress={() => navigate('SignIn')}>
              <Typography variant="onboardingFooterLink">Login</Typography>
            </TouchableOpacity>
          </Typography>
        </Padded>
      </KeyboardAwareScrollView>
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
  healthProField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SignInView;
