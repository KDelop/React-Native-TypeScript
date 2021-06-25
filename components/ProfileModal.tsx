import * as React from 'react';
import {StyleSheet} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

import useChatNavigation from '../hooks/useChatNavigation';
import useCurrentUser from '../hooks/useCurrentUser';
import useUser from '../hooks/useUser';
import {LIGHT_GREY} from './colors';
import Modal from './designSystem/Modal';
import {IProps as IModalProps} from './designSystem/Modal';
import Padded from './designSystem/Padded';
import RoundActionButton from './designSystem/RoundActionButton';
import Typography from './designSystem/Typography';
import UserAvatar from './UserAvatar';
import useGroupCallNavigation from '../hooks/useGroupCallNavigation';
import {ModalManagerParamList} from '../types';

interface IProps extends IModalProps {
  params?: ModalManagerParamList['Profile'];
}

const ProfileModal: React.FunctionComponent<IProps> = ({
  params,
  onRequestClose = () => {},
  ...rest
}) => {
  const navigateToGroupCall = useGroupCallNavigation();
  const currentUser = useCurrentUser();
  const user = useUser(params?.userId);
  const navigateToChat = useChatNavigation();

  if (user.status !== 'success' || currentUser.status !== 'success') {
    return null;
  }

  const isCurrentUser = currentUser.data.id === params?.userId;

  return (
    <Modal onRequestClose={onRequestClose} {...rest}>
      <Padded size={{top: 11}} style={styles.userInfoSection}>
        <Typography variant="profilePictureLabel">
          {user.data.get('isPro') ? 'Pro' : 'Athlete'}
        </Typography>
      </Padded>
      <Padded size={{top: 3, bottom: 3}} style={styles.userAvatarSection}>
        <Padded size={{right: 10}}>
          <RoundActionButton
            diameter={55}
            disabled={isCurrentUser}
            onPress={async (e) => {
              onRequestClose(e);
              await params?.beforeNavigate?.(e);
              navigateToGroupCall([
                {
                  id: user.data.id,
                  firstName: user.data.get('firstName'),
                  lastName: user.data.get('lastName'),
                },
              ]);
            }}>
            <IonIcon name="videocam-outline" size={28} color={LIGHT_GREY} />
          </RoundActionButton>
        </Padded>
        <UserAvatar
          userId={user.data?.id}
          diameter={100}
          halo={user.data.get('isPro') ? 'red' : 'grey'}
          openProfile={false}
        />
        <Padded size={{left: 10}}>
          <RoundActionButton
            disabled={isCurrentUser}
            diameter={55}
            onPress={async (e) => {
              onRequestClose(e);
              await params?.beforeNavigate?.(e);
              navigateToChat({
                id: user.data.id,
                firstName: user.data.get('firstName'),
                lastName: user.data.get('lastName'),
              });
            }}>
            <IonIcon name="chatbubble-outline" size={28} color={LIGHT_GREY} />
          </RoundActionButton>
        </Padded>
      </Padded>
      <Padded size={{bottom: 15}} style={styles.userInfoSection}>
        <Typography style={styles.label} variant="profilePictureLabel">
          {user.data?.get('firstName')} {user.data?.get('lastName')}
        </Typography>
        <Typography variant="profilePictureLocationLabel">
          {user.data?.get('city')}, {user.data?.get('state')}
        </Typography>
      </Padded>
    </Modal>
  );
};

const styles = StyleSheet.create({
  userAvatarSection: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfoSection: {
    flex: 0,
    alignItems: 'center',
  },
  label: {
    fontSize: 22,
  },
});

export default ProfileModal;
