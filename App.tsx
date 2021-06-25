import React from 'react';
import Toast, {BaseToastProps} from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {ApolloProvider} from '@apollo/client';

import {RootStackParamList} from './types';
import {client} from './apollo/config';
import createCustomNavigator from './CustomNavigator';
import SignInView from './components/SignInView';
import UserProvider, {UserContext} from './components/UserProvider';
import DashboardView from './components/DashboardView';
import WelcomeView from './components/WelcomeView';
import SignUpView from './components/SignUpView';
import LoadingView from './components/LoadingView';
import ExploreView from './components/ExploreView';
import ChatListView from './components/ChatListView';
import ChatView from './components/ChatView';
import NewChatView from './components/NewChatView';
import GroupCallView from './components/GroupCallView';
import StreamView from './components/StreamView';
import NewGroupCallView from './components/NewGroupCallView';
import StreamListView from './components/StreamListView';
import SettingsView from './components/SettingsView';
import ScheduleView from './components/ScheduleView';
import NewScheduleItemView from './components/NewScheduleItemView';
import UserToast from './components/UserToast';
import useNotificationResponder from './hooks/useNotificationResponder';
import ResetPasswordView from './components/ResetPasswordView';
import RoundToast from './components/designSystem/RoundToast';

const CustomNavigator = createCustomNavigator<RootStackParamList>();

interface IToastProps extends BaseToastProps {
  props: {
    userId?: string;
  };
}

const toastConfig = {
  message: ({text1, text2, props, onPress}: IToastProps) => (
    <UserToast
      userId={props?.userId}
      title={text1}
      description={text2}
      onPress={onPress}
    />
  ),
  error: ({text1, text2, props, onPress}: IToastProps) => (
    <RoundToast primaryText={text1} secondaryText={text2} />
  ),
};

const NotificationWrapper = (Component: React.FunctionComponent) => () => {
  useNotificationResponder();
  return <Component />;
};

const StackNavigator = () => {
  const userContext = React.useContext(UserContext);

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <CustomNavigator.Navigator>
          {userContext.initializing ? (
            <CustomNavigator.Screen name="Loading" component={LoadingView} />
          ) : userContext.user ? (
            <>
              <CustomNavigator.Screen
                name="Dashboard"
                component={NotificationWrapper(DashboardView)}
                options={{showNavigation: true}}
              />
              <CustomNavigator.Screen
                name="Explore"
                component={NotificationWrapper(ExploreView)}
                options={{showNavigation: true}}
              />
              <CustomNavigator.Screen
                name="ChatList"
                component={ChatListView}
                options={{showNavigation: true}}
              />
              <CustomNavigator.Screen name="Chat" component={ChatView} />
              <CustomNavigator.Screen
                name="NewChat"
                component={NewChatView}
                options={{showNavigation: true}}
              />
              <CustomNavigator.Screen
                name="NewGroupCall"
                component={NotificationWrapper(NewGroupCallView)}
                options={{showNavigation: true}}
              />
              <CustomNavigator.Screen
                name="NewScheduleItem"
                component={NotificationWrapper(NewScheduleItemView)}
                options={{showNavigation: false}}
              />
              <CustomNavigator.Screen
                name="GroupCall"
                component={NotificationWrapper(GroupCallView)}
                options={{disableSafeArea: true}}
              />
              <CustomNavigator.Screen
                name="Stream"
                component={NotificationWrapper(StreamView)}
                options={{disableSafeArea: true}}
              />
              <CustomNavigator.Screen
                name="StreamList"
                component={NotificationWrapper(StreamListView)}
                options={{showNavigation: true}}
              />
              <CustomNavigator.Screen
                name="Settings"
                component={NotificationWrapper(SettingsView)}
                options={{disableSafeArea: true}}
              />
              <CustomNavigator.Screen
                name="Schedule"
                component={NotificationWrapper(ScheduleView)}
                options={{showNavigation: true}}
              />
            </>
          ) : (
            <>
              <CustomNavigator.Screen
                name="Welcome"
                component={WelcomeView}
                options={{disableSafeArea: true}}
              />
              <CustomNavigator.Screen
                name="SignIn"
                component={SignInView}
                options={{disableSafeArea: true}}
              />
              <CustomNavigator.Screen
                name="SignUp"
                component={SignUpView}
                options={{disableSafeArea: true}}
              />
              <CustomNavigator.Screen
                name="ResetPassword"
                component={ResetPasswordView}
                options={{disableSafeArea: true}}
              />
            </>
          )}
        </CustomNavigator.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} ref={Toast.setRef} />
    </ApolloProvider>
  );
};

const App = () => {
  return (
    <UserProvider>
      <StackNavigator />
    </UserProvider>
  );
};

export default App;
