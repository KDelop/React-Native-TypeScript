import * as React from 'react';
import {StyleSheet} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import {useModal} from '../hooks/useModal';
import {BRAND_BLUE} from './colors';
import RoundActionButton from './designSystem/RoundActionButton';

const ConnectModalBottomNavigationItem = () => {
  const openModal = useModal();

  return (
    <RoundActionButton
      style={styles.root}
      diameter={46}
      backgroundColor={BRAND_BLUE}
      onPress={() => openModal('Connect')}>
      <EntypoIcon name="plus" color="#FFF" size={22} />
    </RoundActionButton>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
  },
});

export default ConnectModalBottomNavigationItem;
