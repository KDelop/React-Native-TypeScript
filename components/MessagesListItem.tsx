import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { oc } from 'ts-optchain';
import AntIcon from 'react-native-vector-icons/AntDesign';

import UserAvatar from './UserAvatar';
import Typography from './Typography';
import { DARK_GREY } from '../constants/colors';
import NiceTime from './NiceTime';
import { IParticipant, joinParticipantNames } from '../utils/user';
import UserListItem from './UserListItem';

interface IProps {
  loading: boolean;
  conversationId?: number;
  timestamp: string;
  participants: IParticipant[];
  borderBottom?: boolean;
  preview?: React.ReactNode;
  previewIsReply?: boolean;
}

const MessageListItem: React.SFC<IProps> = ({
  loading,
  borderBottom,
  preview,
  participants,
  previewIsReply,
  timestamp,
  conversationId
}) => {
  const { navigate } = useNavigation();
  const handleOnPress = React.useCallback(() => {
    navigate('Message', { conversationId });
  }, [conversationId]);

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <UserListItem
        loading={loading}
        borderBottom={borderBottom}
        userId={oc(participants)[0].id()}
        primary={
          <React.Fragment>
            <Typography style={styles.userName} variant="title2">
              {joinParticipantNames(participants)}
            </Typography>
          </React.Fragment>
        }
        secondary={
          <React.Fragment>
            <View style={styles.messagePreviewContainer}>
              {previewIsReply && (
                <AntIcon
                  name="back"
                  size={16}
                  color="rgba(34, 34, 34, 0.5)"
                  style={styles.replyIcon}
                />
              )}
              <Typography
                style={styles.messagePreview}
                variant="body"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {preview}
              </Typography>
            </View>
            <Typography style={styles.timestamp} variant="body">
              <NiceTime timestamp={parseInt(timestamp)} />
            </Typography>
          </React.Fragment>
        }
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  replyIcon: {
    marginRight: 8
  },
  messagePreviewContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 3
  },
  messagePreview: {
    flex: 1,
    color: 'rgba(34, 34, 34, 0.5)',
    fontSize: 14
  },
  userName: {
    color: DARK_GREY,
    fontWeight: '600',
    fontSize: 16
  },
  timestamp: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(34, 34, 34, 0.5)',
    paddingTop: 3
  }
});

export default MessageListItem;
