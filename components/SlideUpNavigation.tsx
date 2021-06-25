import * as React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import OctoIcon from 'react-native-vector-icons/Octicons';
import { useNavigation } from 'react-navigation-hooks';
import { View, StyleSheet } from 'react-native';

import SlideUpModal, { IProps as ISlideUpModalProps } from './SlideUpModal';
import SlideUpNavItem from './SlideUpNavItem';

interface IProps extends Pick<ISlideUpModalProps, 'open' | 'onRequestClose'> {}

const SlideUpNavigation: React.SFC<IProps> = ({ open, onRequestClose }) => {
  const { navigate } = useNavigation();

  return (
    <SlideUpModal
      open={open}
      onRequestClose={onRequestClose}
      cardProps={{ color: 'blue' }}
    >
      <View style={styles.root}>
        <View style={[styles.row, styles.topRow]}>
          <SlideUpNavItem
            icon={<FeatherIcon name="search" size={28} color="#FFF" />}
            label="Explore"
          />
          <SlideUpNavItem
            icon={<OctoIcon name="jersey" size={28} color="#FFF" />}
            label="My Team"
          />
          <SlideUpNavItem
            icon={<FeatherIcon name="video" size={28} color="#FFF" />}
            label="Call"
          />
        </View>
        <View style={styles.row}>
          <SlideUpNavItem
            icon={<FeatherIcon name="message-circle" size={28} color="#FFF" />}
            label="Chat"
          />
          <SlideUpNavItem
            onPress={e => {
              navigate('LiveStreamProducer');
              onRequestClose && onRequestClose(e);
            }}
            icon={<OctoIcon name="broadcast" size={28} color="#FFF" />}
            label="Go Live"
          />
          <SlideUpNavItem
            icon={<AntIcon name="calendar" size={28} color="#FFF" />}
            label="Schedule"
          />
        </View>
      </View>
    </SlideUpModal>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
    paddingTop: 40,
    flex: 1
  },
  topRow: {
    marginBottom: 10
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default SlideUpNavigation;
