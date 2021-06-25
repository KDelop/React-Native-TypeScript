import * as React from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, View} from 'react-native';

import AppContainer from './designSystem/AppContainer';
import RoundActionButton from './designSystem/RoundActionButton';
import useGroupCallRTC from '../hooks/useGroupCallRTC';
import GroupCallControls from './GroupCallControls';
import Logo from './Logo';
import VideoLoadingView from './VideoLoadingView';
import GroupCallGridLayout from './GroupCallGridLayout';
import GradientButton from './designSystem/GradientButton';
import {RootStackParamList} from '../types';
import {UserContext} from './UserProvider';

const GroupCallView = () => {
  const userContext = React.useContext(UserContext);
  const {params} = useRoute<RouteProp<RootStackParamList, 'GroupCall'>>();
  const {goBack} = useNavigation();
  const {
    channelId,
    peers,
    micIsOn,
    cameraIsOn,
    dispatch,
    state,
  } = useGroupCallRTC();

  const center = React.useMemo(
    () => (
      <RoundActionButton
        onPress={async () => {
          dispatch('LEAVE', {
            onLeave: () => {
              goBack();
            },
          });
        }}
        diameter={60}
        cardColor="red">
        <MaterialCommunityIcon name="phone-hangup" size={30} color="white" />
      </RoundActionButton>
    ),
    [state.value],
  );

  const inner =
    state.matches('inactive') ||
    state.matches('leavingCall') ||
    state.matches('initializing') ? (
      <VideoLoadingView />
    ) : (
      <>
        <AppContainer
          style={{backgroundColor: 'transparent'}}
          statusBarStyle="light-content">
          {!state.matches('inCall') && (
            <View style={styles.joinCallButtonContainer}>
              <GradientButton
                onPress={() => {
                  if (userContext.user) {
                    dispatch('JOIN', {
                      attendees: params.participants,
                      channelId: params.channelId,
                      userId: userContext.user?.uid,
                    });
                  }
                }}
                style={styles.joinCallButton}
                color="blur"
                paddingSize={{top: 3, bottom: 3}}>
                JOIN
              </GradientButton>
            </View>
          )}
          <GroupCallGridLayout
            channelId={channelId as string}
            peers={peers}
            localCameraIsOff={!cameraIsOn}
            localMicIsOff={!micIsOn}
          />
        </AppContainer>
        <View style={styles.controlsContainer}>
          <GroupCallControls
            center={center}
            left={
              <>
                <RoundActionButton
                  onPress={() => dispatch('TOGGLE_CAMERA')}
                  diameter={50}
                  backgroundColor={`rgba(255, 255, 255, ${
                    cameraIsOn ? 0.2 : 0.4
                  })`}>
                  <MaterialIcon
                    name={`videocam${cameraIsOn ? '' : '-off'}`}
                    size={22}
                    color="white"
                  />
                </RoundActionButton>
                <RoundActionButton
                  onPress={() => dispatch('TOGGLE_MIC')}
                  diameter={50}
                  backgroundColor={`rgba(255, 255, 255, ${
                    micIsOn ? 0.2 : 0.4
                  })`}>
                  <MaterialIcon
                    name={`mic${micIsOn ? '' : '-off'}`}
                    size={22}
                    color="white"
                  />
                </RoundActionButton>
              </>
            }
            right={
              <>
                <RoundActionButton
                  onPress={() => dispatch('FLIP_CAMERA')}
                  diameter={50}
                  backgroundColor="rgba(255, 255, 255, 0.2)">
                  <MaterialIcon
                    name="flip-camera-ios"
                    size={22}
                    color="white"
                  />
                </RoundActionButton>
                <RoundActionButton
                  disabled
                  diameter={50}
                  backgroundColor="rgba(255, 255, 255, 0.05)">
                  <Logo width="90px" fill="white" hideText />
                </RoundActionButton>
              </>
            }
          />
        </View>
      </>
    );

  return <View style={styles.root}>{inner}</View>;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'black',
  },
  blurView: {
    flex: 1,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    elevation: 0,
    zIndex: 1,
  },
  controls: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  centerControls: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  joinCallButton: {
    marginTop: 100,
    width: 80,
  },
  joinCallButtonContainer: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GroupCallView;
