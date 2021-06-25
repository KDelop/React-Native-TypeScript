import * as React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, Text } from 'react-native';

import BottomNavigationItem from './BottomNavigationItem';
import { BRAND_BLUE } from '../constants/colors';
import useCurrentUser from '../hooks/useCurrentUser';
import SlideUpNavButton from './SlideUpNavButton';
import SlideUpNavigation from './SlideUpNavigation';

const BottomNavigation: React.SFC = () => {
  const [slideUpNavOpen, setSlideUpNavOpen] = React.useState(false);
  const [error, loading, currentUser] = useCurrentUser();
  const { navigate } = useNavigation();

  const handleOpenSlideUpNav = React.useCallback(
    () => setSlideUpNavOpen(true),
    []
  );
  const handleCloseSlideUpNav = React.useCallback(
    () => setSlideUpNavOpen(false),
    []
  );

  return (
    <View style={styles.root}>
      <BottomNavigationItem
        onPress={() => navigate('Dashboard')}
        icon={<FontAwesomeIcon name="bolt" size={22} color={BRAND_BLUE} />}
        text="Home"
      />
      <BottomNavigationItem
        onPress={() => navigate('Explore')}
        icon={<FeatherIcon name="search" size={22} color={BRAND_BLUE} />}
        text="Explore"
      />
      <SlideUpNavButton onPress={handleOpenSlideUpNav} />
      <BottomNavigationItem
        icon={<AntIcon name="calendar" size={22} color={BRAND_BLUE} />}
        text="Schedule"
      />
      <BottomNavigationItem
        onPress={() => navigate('Profile', { userId: currentUser?.id })}
        icon={
          <FontAwesomeIcon name="user-circle-o" size={22} color={BRAND_BLUE} />
        }
        text="Profile"
      />
      <SlideUpNavigation
        onRequestClose={handleCloseSlideUpNav}
        open={slideUpNavOpen}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingRight: '2.5%',
    paddingLeft: '2.5%',
    backgroundColor: '#fff',
    shadowOffset: { height: -6, width: 0 },
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    zIndex: 10,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 65
  }
});

export default BottomNavigation;
