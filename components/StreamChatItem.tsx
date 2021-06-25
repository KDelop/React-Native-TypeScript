import * as React from 'react';
import {BlurView} from '@react-native-community/blur';
import {StyleSheet} from 'react-native';

import Padded from './designSystem/Padded';
import Typography from './designSystem/Typography';
import UserAvatar from './UserAvatar';

interface IProps {
  userId: string;
  userFirstName: string;
  userLastName: string;
  isHost: boolean;
}

const StreamChatItem: React.FunctionComponent<IProps> = ({
  userId,
  userFirstName,
  userLastName,
  isHost,
  children,
}) => {
  return (
    <Padded size={{bottom: 2}} style={styles.root}>
      <Padded size={{right: 2}}>
        <UserAvatar
          userId={userId}
          openProfile={false}
          diameter={36}
          disabled
        />
      </Padded>
      <BlurView
        blurType={isHost ? 'materialDark' : 'ultraThinMaterialDark'}
        style={styles.blurView}>
        <Padded
          size={{left: 2, top: 1, bottom: 1, right: 2}}
          style={styles.content}>
          <Typography
            variant={
              isHost ? 'streamChatItemHostTitle' : 'streamChatItemTitle'
            }>
            {userFirstName} {userLastName}
          </Typography>
          <Typography variant="streamChatItemBody">{children}</Typography>
        </Padded>
      </BlurView>
    </Padded>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  blurView: {
    flexShrink: 1,
    borderRadius: 10,
  },
  content: {
    borderRadius: 10,
    flexShrink: 1,
    justifyContent: 'center',
  },
});

export default StreamChatItem;
