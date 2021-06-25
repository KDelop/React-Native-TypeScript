import * as React from 'react';
import { StyleSheet } from 'react-native';

import BasicHeader from './BasicHeader';
import UserAvatar from './UserAvatar';
import Typography from './Typography';
import UserProfileButton from './UserProfileButton';
import { joinParticipantNames, IParticipant } from '../utils/user';
import { BRAND_BLUE } from '../constants/colors';

interface IProps {
  userId?: number;
  loading: boolean;
  participants: IParticipant[];
}

const MessageHeader: React.SFC<IProps> = ({
  userId,
  participants,
  loading
}) => {
  return (
    <BasicHeader>
      <UserProfileButton
        userId={userId}
        TouchableOpacityProps={{
          style: styles.userAvatarContainer
        }}
      >
        <UserAvatar size="small" userId={userId} loading={loading} />
        <Typography style={styles.userName} variant="title">
          {joinParticipantNames(participants)}
        </Typography>
      </UserProfileButton>
    </BasicHeader>
  );
};

const styles = StyleSheet.create({
  userName: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
    color: BRAND_BLUE
  },
  userAvatarContainer: {
    flex: 0,
    alignItems: 'center'
  }
});

export default MessageHeader;
