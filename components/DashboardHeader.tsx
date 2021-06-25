import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';

import DashboardHeaderUnderline from './DashboardHeaderUnderline';
import Typography from './designSystem/Typography';
import Padded from './designSystem/Padded';
import UserAvatar from './UserAvatar';
import {BRAND_BLUE} from './colors';

interface IProps {
  userId?: string;
}

const DashboardHeader: React.FunctionComponent<IProps> = ({userId}) => {
  const {navigate} = useNavigation();

  return (
    <View style={styles.root}>
      <Padded size={{left: 5, right: 5}}>
        <Padded size={{top: 1}} style={styles.header}>
          <UserAvatar
            diameter={34}
            onPress={() => navigate('Settings')}
            openProfile={false}
            userId={userId}
          />
          <TouchableOpacity
            delayPressIn={0}
            onPress={() => navigate('ChatList')}>
            <FeatherIcon name="message-square" size={26} color={BRAND_BLUE} />
          </TouchableOpacity>
        </Padded>
        <Padded size={{top: 5}}>
          <Typography variant="dashboardWelcome">Today</Typography>
        </Padded>
      </Padded>
      <DashboardHeaderUnderline />
      <Padded size={{left: 5, right: 5, top: 2}}>
        <Typography variant="dashboardHeaderDate">
          Today, {format(new Date(), 'dd MMM yyyy')}
        </Typography>
      </Padded>
      <LinearGradient
        pointerEvents="none"
        colors={['#FFFFFFFF', '#FFFFFF00']}
        style={styles.gradient}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    zIndex: 1,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: -35,
    right: 0,
    width: '100%',
    height: 35,
    shadowOpacity: 0,
    elevation: 1,
  },
});

export default DashboardHeader;
