import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import Typography from './Typography';
import UserAvatar from './UserAvatar';
import { MEDIUM_GREY, BRAND_BLUE } from '../constants/colors';

interface IProps {
  loading: boolean;
  first?: boolean;
  fromCurrentUser?: boolean;
  connectToNext?: boolean;
  userId?: number;
}

const MessageItem: React.SFC<IProps> = ({
  fromCurrentUser,
  first,
  connectToNext,
  userId,
  loading,
  children
}) => {
  return (
    <View
      style={[
        styles.container,
        fromCurrentUser && styles.currentUserContainer,
        connectToNext && styles.connectToNextContainer
      ]}
    >
      {first && !fromCurrentUser && (
        <UserAvatar userId={userId} loading={loading} />
      )}
      <View
        style={[
          styles.content,
          fromCurrentUser && styles.currentUserContent,
          first && !fromCurrentUser && styles.firstMessage,
          !first && !fromCurrentUser && styles.indentMessage,
          first && fromCurrentUser && styles.firstMessageCurrentUser
        ]}
      >
        <Typography
          style={[styles.body, fromCurrentUser && styles.currentUserBody]}
          variant="body"
        >
          {children}
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  currentUserContainer: {
    justifyContent: 'flex-end'
  },
  currentUserContent: {
    marginLeft: 0,
    backgroundColor: BRAND_BLUE,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  currentUserBody: {
    color: '#FFF'
  },
  body: {
    fontWeight: '400',
    color: MEDIUM_GREY,
    fontSize: 16
  },
  container: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 32
  },
  content: {
    backgroundColor: '#FFF',
    shadowOffset: { height: 5, width: 0 },
    shadowRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    padding: 14,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 6,
    marginLeft: 12,
    maxWidth: '85%'
  },
  connectToNextContainer: {
    marginBottom: 4
  },
  firstMessage: {
    borderTopLeftRadius: 0
  },
  firstMessageCurrentUser: {
    borderTopRightRadius: 0
  },
  indentMessage: {
    marginLeft: 52
  }
});

export default MessageItem;
