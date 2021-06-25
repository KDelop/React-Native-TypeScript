import {useNavigation} from '@react-navigation/native';
import * as React from 'react';

import ListViewHeader from './designSystem/ListViewHeader';
import StreamList from './StreamList';
import {IStream} from '../types';

const StreamListView: React.FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const {navigate} = useNavigation();

  const onStreamClick = (stream: IStream) => {
    navigate('Stream', {streamId: stream.id, isHost: stream.isInitiator});
  };

  return (
    <>
      <ListViewHeader
        showBackButton={false}
        title="Streams"
        searchInputProps={{onChangeText: setSearchTerm}}
      />
      <StreamList searchTerm={searchTerm} onStreamClick={onStreamClick} />
    </>
  );
};

export default StreamListView;
