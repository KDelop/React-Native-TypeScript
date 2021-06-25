import * as React from 'react';
import {StyleSheet} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {NavigationHelpersContext} from '@react-navigation/native';

import Modal from './designSystem/Modal';
import {IProps as IModalProps} from './designSystem/Modal';
import RoundActionButton from './designSystem/RoundActionButton';
import Typography from './designSystem/Typography';
import Padded from './designSystem/Padded';
import {LIGHT_GREY} from './colors';

interface IProps extends IModalProps {
  params?: Record<string, any>;
}

const ConnectModal: React.FunctionComponent<IProps> = ({
  params,
  onRequestClose = () => {},
  ...rest
}) => {
  const navigation = React.useContext(NavigationHelpersContext);

  return (
    <Modal
      onRequestClose={onRequestClose}
      cardProps={{color: 'blue'}}
      {...rest}>
      <Padded size={{left: 8, top: 4, bottom: 4}} style={styles.title}>
        <Typography variant="connectModalTitle">Connect</Typography>
      </Padded>
      <Padded size={{left: 8, right: 8, top: 6, bottom: 6}} style={styles.row}>
        <RoundActionButton
          disableDropShadow
          diameter={65}
          backgroundColor="rgba(255, 255, 255, 0.1)"
          onPress={(e) => {
            onRequestClose(e);
            navigation?.navigate('NewGroupCall');
          }}
          label="Video">
          <IonIcon name="videocam-outline" size={28} color="white" />
        </RoundActionButton>
        <RoundActionButton
          disableDropShadow
          diameter={65}
          backgroundColor="rgba(255, 255, 255, 0.1)"
          onPress={(e) => {
            onRequestClose(e);
            navigation?.navigate('Stream', {streamId: '', isHost: true});
          }}
          label="Go Live">
          <IonIcon name="radio-outline" size={28} color="white" />
        </RoundActionButton>
        <RoundActionButton
          disableDropShadow
          diameter={65}
          backgroundColor="rgba(255, 255, 255, 0.1)"
          onPress={(e) => {
            onRequestClose(e);
            navigation?.navigate('NewChat');
          }}
          label="Chat">
          <FeatherIcon name="message-square" size={28} color="white" />
        </RoundActionButton>
      </Padded>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    borderBottomColor: LIGHT_GREY,
    borderBottomWidth: 0.5,
  },
  row: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ConnectModal;
