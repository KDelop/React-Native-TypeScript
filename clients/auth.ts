import * as Keychain from 'react-native-keychain';
import { Auth } from 'aws-amplify';
import { createWebsocketConnection } from '../config/websockets';

interface ISignupArgs {
  username: string;
  password: string;
  name: string;
  dateOfBirth: string;
}

export const signUp = async ({
  username,
  password,
  name,
  dateOfBirth
}: ISignupArgs) =>
  Auth.signUp({
    username,
    password,
    attributes: {
      email: username,
      birthdate: dateOfBirth,
      name
    }
  });

interface IConfirmSignUpArgs {
  username: string;
  code: string;
}

export const confirmSignUp = async ({ username, code }: IConfirmSignUpArgs) =>
  Auth.confirmSignUp(username, code);

interface ILoginArgs {
  username: string;
  password: string;
}

export const signIn = async ({ username, password }: ILoginArgs) => {
  await Auth.signIn(username, password);
  await Keychain.setInternetCredentials('auth', username, password, {
    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE
  });
  await createWebsocketConnection();
};

export const signOut = async () => {
  await Auth.signOut();
  await Keychain.resetInternetCredentials('auth');
};

export const forgotPassword = (email: string) => Auth.forgotPassword(email);

interface IForgotPasswordSubmitArgs {
  username: string;
  code: string;
  password: string;
}

export const forgotPasswordSubmit = ({
  username,
  code,
  password
}: IForgotPasswordSubmitArgs) =>
  Auth.forgotPasswordSubmit(username, code, password);
