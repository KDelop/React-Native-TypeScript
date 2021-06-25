import * as React from 'react';
import MaskedView from '@react-native-community/masked-view';
import {FlatList, StyleSheet, View, ViewProps} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Padded, {BASE_PADDING} from './designSystem/Padded';
import StreamChatItem from './StreamChatItem';
import {IRTMMessage} from '../machines/streamChat';
import Typography from './designSystem/Typography';
import Badge from './designSystem/Badge';

interface IHeaderItem {
  type: 'header';
  title: string;
  description: string;
}

interface IProps {
  style?: ViewProps['style'];
  messages: ReadonlyArray<IRTMMessage>;
  hostId?: string;
  streamTitle: string;
  streamDescription: string;
}

const createHeaderItem = (title: string, description: string) =>
  ({
    type: 'header',
    title,
    description,
  } as IHeaderItem);

const StreamChatList: React.FunctionComponent<IProps> = ({
  streamTitle,
  streamDescription,
  messages,
  hostId,
  style,
}) => {
  return (
    <MaskedView
      style={[styles.root, style]}
      maskElement={
        <LinearGradient
          style={{flex: 1}}
          colors={['transparent', 'black']}
          locations={[0, 0.6]}
        />
      }>
      <FlatList
        data={[
          ...messages.slice().sort((a, b) => parseInt(b.ts) - parseInt(a.ts)),
          createHeaderItem(streamTitle, streamDescription),
        ]}
        keyExtractor={(message) =>
          message.type === 'message' ? message.uid + message.ts : message.type
        }
        style={{flexGrow: 1, overflow: 'visible'}}
        onStartShouldSetResponder={() => true}
        contentContainerStyle={{
          paddingLeft: BASE_PADDING * 5,
          paddingRight: BASE_PADDING * 5,
          paddingBottom: BASE_PADDING * 10,
        }}
        inverted={true}
        renderItem={({item}) => {
          if (item.type === 'header') {
            return (
              <Padded size={{bottom: 3}}>
                <View style={styles.badgeContainer}>
                  <Typography variant="streamChatHeaderPrimary">
                    {item.title}
                  </Typography>
                  <Padded size={{left: 1}}>
                    <Badge fontSize={12}>LIVE</Badge>
                  </Padded>
                </View>
                <Typography variant="streamChatHeaderSecondary">
                  {item.description}
                </Typography>
              </Padded>
            );
          }

          if (item.type === 'message') {
            const jsonBody = JSON.parse(item.text);
            return (
              <StreamChatItem
                key={item.uid + item.ts}
                isHost={hostId === item.uid}
                userId={item.uid}
                userFirstName={jsonBody.firstName}
                userLastName={jsonBody.lastName}>
                {jsonBody.message}
              </StreamChatItem>
            );
          }

          return null;
        }}
      />
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 0,
    height: 200,
    justifyContent: 'flex-end',
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default StreamChatList;
