import * as React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from 'react-navigation-hooks';
import { View, Text, StyleSheet } from 'react-native';

import UserAvatar from './UserAvatar';
import SlideUpModal from './SlideUpModal';
import { BRAND_BLUE, INPUT_GREY, MEDIUM_GREY } from '../constants/colors';
import RaisedButton from './RaisedButton';
import useInviteToTeam from '../hooks/userInviteToTeam';
import { Maybe, TeammateStatus } from '../types/graphql';

interface IProps {
  userId?: Maybe<string>;
  open: boolean;
  onRequestClose?(): void;
  onAnimationEnd?(): void;
  onAddToTeamSuccess?(): void;
  isPro?: boolean;
  name?: React.ReactNode;
  teammateStatus?: Maybe<TeammateStatus>;
}

const canAddToTeam = (teammateStatus: IProps['teammateStatus']) =>
  teammateStatus !== 'NONE';

const getAddButtonAdornment = (teammateStatus: IProps['teammateStatus']) =>
  teammateStatus !== 'NONE' ? (
    <FeatherIcon name="check" size={18} color="#FFF" />
  ) : (
    <FeatherIcon name="plus" size={18} color={BRAND_BLUE} />
  );

const getAddButtonColor = (teammateStatus: IProps['teammateStatus']) =>
  teammateStatus !== 'NONE' ? 'blue' : 'white';

const getAddButtonText = (teammateStatus: IProps['teammateStatus']) => {
  switch (teammateStatus) {
    case 'TEAMMATES':
      return 'Teammates';
    case 'REQUEST_RECEIVED':
      return 'Invitation Recieved';
    case 'REQUEST_SENT':
      return 'Invitation Sent';
    case 'NONE':
      return 'Add To Team';
  }
};

const UserSummaryModal: React.SFC<IProps> = ({
  open,
  userId,
  onRequestClose,
  onAddToTeamSuccess,
  onAnimationEnd,
  isPro,
  name,
  teammateStatus
}) => {
  const { navigate } = useNavigation();
  const [error, loading, inviteToTeam] = useInviteToTeam();

  const handleFollowOnPress = React.useCallback(async () => {
    if (!userId) {
      return;
    }

    try {
      await inviteToTeam(userId);

      if (onAddToTeamSuccess) {
        onAddToTeamSuccess();
      }

      if (onRequestClose) {
        onRequestClose();
      }
    } catch (e) {
      console.log(e);
    }
  }, [userId, onRequestClose, inviteToTeam]);

  const handleChatOnPress = React.useCallback(async () => {}, [onRequestClose]);

  return (
    <SlideUpModal
      open={open}
      onRequestClose={onRequestClose}
      onAnimationEnd={onAnimationEnd}
    >
      <View style={styles.root}>
        <View style={styles.centeredContent}>
          <Text style={styles.userTypeText}>{isPro ? 'Pro' : 'Athlete'}</Text>
          <View style={styles.userAvatarContainer}>
            <UserAvatar userId={userId} loading={false} size="xlarge" />
          </View>
          <Text style={styles.userGivenName}>{name}</Text>
          <Text style={styles.userCerts}>DPT, CSCS</Text>
          <View style={styles.buttonRow}>
            {teammateStatus === 'TEAMMATES' && (
              <RaisedButton
                onPress={handleChatOnPress}
                leftAdornment={
                  <FeatherIcon
                    name="message-circle"
                    size={18}
                    color={BRAND_BLUE}
                  />
                }
              >
                Chat
              </RaisedButton>
            )}
            <RaisedButton
              onPress={handleFollowOnPress}
              disabled={canAddToTeam(teammateStatus)}
              leftAdornment={getAddButtonAdornment(teammateStatus)}
              cardProps={{
                color: getAddButtonColor(teammateStatus)
              }}
            >
              {getAddButtonText(teammateStatus)}
            </RaisedButton>
          </View>
        </View>
      </View>
    </SlideUpModal>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 40,
    paddingBottom: 40
  },
  userTypeText: {
    fontSize: 18,
    fontFamily: 'Montserrat',
    fontWeight: '800',
    fontStyle: 'italic',
    color: BRAND_BLUE,
    marginBottom: 15
  },
  userGivenName: {
    fontSize: 18,
    fontFamily: 'Montserrat',
    fontWeight: '800',
    textTransform: 'uppercase',
    fontStyle: 'italic',
    color: BRAND_BLUE,
    marginBottom: 5
  },
  userCerts: {
    fontSize: 12,
    color: MEDIUM_GREY,
    marginBottom: 30
  },
  userAvatarContainer: {
    padding: 5,
    borderColor: INPUT_GREY,
    borderRadius: 50,
    borderWidth: 5,
    borderStyle: 'solid',
    marginBottom: 15
  },
  centeredContent: {
    flex: 0,
    alignItems: 'center'
  },
  buttonRow: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default UserSummaryModal;
