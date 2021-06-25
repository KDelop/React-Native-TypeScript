import * as React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {formatRelative, fromUnixTime} from 'date-fns/esm';

import ListItem from './designSystem/ListItem';
import UserAvatar from './UserAvatar';
import Typography from './designSystem/Typography';
import ListPlaceholder from './designSystem/ListPlaceholder';
import {IStream} from '../types';
import useStreams from '../hooks/useStreams';
import Badge from './designSystem/Badge';

export interface IProps {
  onStreamClick: (stream: IStream) => void;
  searchTerm?: string;
}

const isHappeningNow = (timeMs: number) => timeMs < Date.now();

const getTimeString = (timeMs: number) => {
  if (isHappeningNow(timeMs)) {
    return 'Now!';
  }

  const format = formatRelative(fromUnixTime(timeMs / 1000), new Date());
  return format[0].toUpperCase() + format.substr(1);
};

const StreamList: React.FunctionComponent<IProps> = ({
  onStreamClick,
  searchTerm = '',
}) => {
  const streams = useStreams();

  const filterStream = (searchTerm: string) => (streamItem: IStream) => {
    const term = `${streamItem.title} ${streamItem.description} ${streamItem.initiatedBy.firstName} ${streamItem.initiatedBy.lastName}`.toLowerCase();
    return term.includes(searchTerm.toLowerCase());
  };

  return (
    <FlatList
      style={styles.list}
      data={
        streams.status === 'success'
          ? streams?.data?.filter(filterStream(searchTerm))
          : []
      }
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContentContainer}
      ListEmptyComponent={() => {
        if (streams.status === 'loading') {
          return <ListPlaceholder.Loading />;
        }

        if (
          searchTerm &&
          streams.status === 'success' &&
          streams.data.length > 0
        ) {
          return <ListPlaceholder.NoSearchResults searchTerm={searchTerm} />;
        }

        return (
          <ListPlaceholder.NoData>
            No streams yet... Create one by hitting the (+) button below and
            selecting "Go Live"! 🤳 💪
          </ListPlaceholder.NoData>
        );
      }}
      renderItem={({item: stream, index}) => (
        <ListItem
          showDivider={
            streams.status === 'success' && index < streams.data.length - 1
          }
          onPress={() => onStreamClick(stream)}
          leftAdornment={
            <UserAvatar
              diameter={50}
              userId={stream.initiatedBy?.id}
              openProfile={false}
            />
          }
          rightAdornment={
            isHappeningNow(parseInt(stream.startAt)) && <Badge>LIVE</Badge>
          }
          content={
            <>
              <View style={styles.titleContainer}>
                <Typography
                  variant="listItemPrimary"
                  numberOfLines={1}
                  style={styles.titleText}>
                  {stream.title}
                </Typography>
              </View>
              <Typography variant="listItemSecondary" numberOfLines={2}>
                with {stream.initiatedBy.firstName}{' '}
                {stream.initiatedBy.lastName}
              </Typography>
              <Typography variant="listItemTertiary" numberOfLines={2}>
                {getTimeString(parseInt(stream.startAt))}
              </Typography>
            </>
          }
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingTop: 12,
  },
  listContentContainer: {
    paddingBottom: 12,
  },
  titleText: {
    flexShrink: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default StreamList;
