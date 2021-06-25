import * as React from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {DotIndicator} from 'react-native-indicators';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import Typography from './designSystem/Typography';
import ViewHeader from './designSystem/ViewHeader';
import Padded from './designSystem/Padded';
import UserAvatar from './UserAvatar';
import {useModal} from '../hooks/useModal';
import {BRAND_BLUE, LIGHT_GREY} from './colors';
import {IProps as IViewHeaderProps} from './designSystem/ViewHeader';
import useGroupCallNavigation from '../hooks/useGroupCallNavigation';
import useUser from '../hooks/useUser';

interface IProps extends IViewHeaderProps {
  recipientUserId: string;
  recipientName: {
    firstName: string;
    lastName: string;
  };
  loading: boolean;
}

const ChatViewHeader: React.FunctionComponent<IProps> = ({
  recipientUserId,
  recipientName,
  loading,
  ...rest
}) => {
  const openModal = useModal();
  const {goBack} = useNavigation();
  const user = useUser(recipientUserId);
  const navigateToGroupCall = useGroupCallNavigation();

  return (
    <ViewHeader {...rest} showBackButton={false} dropShadowStyle="drop-shadow">
      <Padded size={{top: 2}} style={styles.headerContent}>
        <View style={styles.left}>
          <TouchableOpacity onPress={() => goBack()}>
            <IonIcon name="chevron-back" size={24} color={BRAND_BLUE} />
          </TouchableOpacity>
          {loading || user.status !== 'success' ? (
            <Padded size={{left: 4}} style={styles.loadingIndictorContainer}>
              <DotIndicator color={LIGHT_GREY} size={4} />
            </Padded>
          ) : (
            <Padded size={{left: 2}}>
              <TouchableOpacity
                delayPressIn={0}
                style={styles.user}
                onPress={() => openModal('Profile', {userId: recipientUserId})}>
                <UserAvatar
                  diameter={34}
                  halo={user.data?.get('isPro') ? 'red' : 'grey'}
                  haloWidth={3}
                  userId={recipientUserId}
                />
                <Padded size={{left: 3}}>
                  <Typography variant="profilePictureLabel">
                    {recipientName.firstName} {recipientName.lastName}
                  </Typography>
                  <Typography variant="profilePictureSubLabel">
                    {user.data.get('isPro') ? 'PRO' : 'ATHLETE'}
                  </Typography>
                </Padded>
              </TouchableOpacity>
            </Padded>
          )}
        </View>
        {user.status === 'success' && (
          <TouchableOpacity
            onPress={() =>
              navigateToGroupCall([{id: recipientUserId, ...recipientName}])
            }>
            <IonIcon name="videocam-outline" size={24} color={BRAND_BLUE} />
          </TouchableOpacity>
        )}
      </Padded>
    </ViewHeader>
  );
};

const styles = StyleSheet.create({
  loadingIndictorContainer: {
    height: 46,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  user: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContent: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default ChatViewHeader;
