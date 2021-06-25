import * as React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { createAppContainer, NavigationNavigatorProps } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';

import '../config/amplify';
import '../config/websockets';
import AppInitView from './AppInitView';
import WelcomeView from './WelcomeView';
import LoginView from './LoginView';
import SignUpView from './SignUpView';
import ForgotPasswordView from './ForgotPasswordView';
import GetStartedView from './GetStartedView';
import AccountOptionSelectView from './AccountOptionSelectView';
import ExpertiseSelectView from './ExpertiseSelectView';
import SexSelectView from './SexSelectView';
import StatsSelectView from './StatsSelectView';
import MessagesView from './MessagesView';
import DashboardView from './DashboardView';
import MessageView from './MessageView';
import ScheduleView from './ScheduleView';
import ProfileView from './ProfileView';
import CurrentUserProfileView from './CurrentUserProfileView';
import ConfirmSignUpView from './ConfirmSignUpView';
import UserNavigationView from './UserNavigationView';
import ConfirmForgotPasswordView from './ConfirmForgotPasswordView';
import EnterNewPasswordView from './EnterNewPasswordView';
import CheckUserAuth from './CheckUserAuth';
import ExploreView from './ExploreView';
import LiveStreamProducerView from './LiveStreamProducerView';

const UserStack = {
  Messages: MessagesView,
  Message: MessageView,
  Dashboard: DashboardView,
  Profile: ProfileView,
  CurrentUserProfile: CurrentUserProfileView,
  Schedule: ScheduleView,
  UserNavigation: UserNavigationView,
  Explore: ExploreView,
  LiveStreamProducer: LiveStreamProducerView
};

const UserNavigation = createStackNavigator(UserStack, {
  initialRouteName: 'Dashboard',
  defaultNavigationOptions: {
    header: null
  }
});

const AuthStack = {
  Welcome: WelcomeView,
  Login: LoginView,
  SignUp: SignUpView,
  ConfirmSignUp: ConfirmSignUpView,
  ForgotPassword: ForgotPasswordView,
  ConfirmForgotPassword: ConfirmForgotPasswordView,
  EnterNewPassword: EnterNewPasswordView,
  GetStarted: GetStartedView,
  AccountOptionSelect: AccountOptionSelectView,
  ExpertiseSelect: ExpertiseSelectView,
  SexSelect: SexSelectView,
  StatsSelect: StatsSelectView
};

const AuthNavigation = createStackNavigator(AuthStack, {
  initialRouteName: 'Welcome',
  defaultNavigationOptions: {
    header: null
  }
});

class UserSlideoutNavigator extends React.Component<NavigationNavigatorProps> {
  static router = UserNavigation.router;

  public render() {
    const { navigation } = this.props;

    return (
      <CheckUserAuth>
        <UserNavigation navigation={navigation} />
      </CheckUserAuth>
    );
  }
}

export const RootStack = {
  AppInit: AppInitView,
  Auth: createAppContainer(AuthNavigation),
  User: createAppContainer(UserSlideoutNavigator)
};

const RootNavigator = createAppContainer(
  createAnimatedSwitchNavigator(RootStack, {
    initialRouteName: 'AppInit'
  })
);

const App: React.SFC = () => (
  <View style={styles.app}>
    <StatusBar />
    <RootNavigator />
  </View>
);

const styles = StyleSheet.create({
  app: {
    height: '100%'
  }
});

export type Stacks =
  | keyof typeof UserStack
  | keyof typeof AuthStack
  | keyof typeof RootStack;

export default App;
