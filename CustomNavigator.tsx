import * as React from 'react';
import {Animated} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {
  NavigationHelpersContext,
  useNavigationBuilder,
  TabRouter,
  TabActions,
  DefaultNavigatorOptions,
  TabRouterOptions,
  createNavigatorFactory,
  TabNavigationState,
} from '@react-navigation/native';

import AppContainer from './components/designSystem/AppContainer';
import BottomNavigationContainer, {
  CONTAINER_HEIGHT,
} from './components/designSystem/BottomNavigationContainer';
import BottomNavigationItem from './components/designSystem/BottomNavigationItem';
import ModalManagerProvider from './components/ModalManager';
import ConnectModalBottomNavigationItem from './components/ConnectModalBottomNavigationItem';
import Toast from 'react-native-toast-message';

type TabNavigationOptions = {
  showNavigation?: boolean;
  disableSafeArea?: boolean;
};

type TabNavigationEventMap = {
  tabPress: {
    data?: {isAlreadyFocused: boolean};
    canPreventDefault: true;
  };
};

type Props = DefaultNavigatorOptions<TabNavigationOptions> & TabRouterOptions;

const CustomNavigator: React.FunctionComponent<Props> = ({
  initialRouteName,
  children,
  screenOptions,
}) => {
  const translate = React.useRef(new Animated.Value(0)).current;
  const translateInverse = React.useRef(new Animated.Value(CONTAINER_HEIGHT))
    .current;
  const {state, navigation, descriptors} = useNavigationBuilder<
    TabNavigationState,
    TabRouterOptions,
    TabNavigationOptions,
    TabNavigationEventMap
  >(TabRouter, {
    children,
    screenOptions,
    initialRouteName,
  });

  const navigate = (routeName: string, params?: object) => {
    const route = state.routes.find((x) => x.name === routeName);
    const event = navigation.emit({
      type: 'tabPress',
      target: route?.key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      navigation.dispatch({
        ...TabActions.jumpTo(routeName, params),
        target: state.key,
      });
    }
  };

  const currentRoute = state.routes[state.index];
  const routeOptions = descriptors[currentRoute.key].options;
  const showNavigation = routeOptions.showNavigation;

  React.useEffect(() => {
    Animated.timing(translate, {
      toValue: showNavigation ? 0 : CONTAINER_HEIGHT + 45, // TODO: create const, 45 is safe area distance
      duration: 200,
      useNativeDriver: false,
    }).start();

    Animated.timing(translateInverse, {
      toValue: showNavigation ? 0 : -CONTAINER_HEIGHT,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [showNavigation]);

  return (
    <NavigationHelpersContext.Provider value={navigation}>
      <ModalManagerProvider>
        <AppContainer passthrough={routeOptions.disableSafeArea}>
          <Animated.View style={[{flex: 1, marginBottom: translateInverse}]}>
            {descriptors[state.routes[state.index].key].render()}
          </Animated.View>
          <Animated.View
            style={{
              height: CONTAINER_HEIGHT,
              transform: [{translateY: translate}],
            }}>
            <BottomNavigationContainer>
              <BottomNavigationItem
                active={currentRoute.name === 'Dashboard'}
                onPress={() => navigate('Dashboard')}
                icon={<FontAwesomeIcon name="bolt" size={22} />}
                text="Home"
              />
              <BottomNavigationItem
                active={currentRoute.name === 'Explore'}
                onPress={() => navigate('Explore')}
                icon={<FeatherIcon name="search" size={22} />}
                text="Explore"
              />
              <ConnectModalBottomNavigationItem />
              <BottomNavigationItem
                active={currentRoute.name === 'StreamList'}
                onPress={() => navigate('StreamList')}
                icon={<IonIcon name="radio-outline" size={22} />}
                text="Streams"
              />
              <BottomNavigationItem
                active={currentRoute.name === 'Schedule'}
                icon={<AntIcon name="calendar" size={22} />}
                onPress={() => navigate('Schedule')}
                text="Schedule"
              />
            </BottomNavigationContainer>
          </Animated.View>
        </AppContainer>
      </ModalManagerProvider>
    </NavigationHelpersContext.Provider>
  );
};

export default createNavigatorFactory<
  TabNavigationState,
  TabNavigationOptions,
  TabNavigationEventMap,
  typeof CustomNavigator
>(CustomNavigator);
