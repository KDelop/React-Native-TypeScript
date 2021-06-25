import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import Padded from './designSystem/Padded';
import UserAvatar from './UserAvatar';
import VerticalScrollList from './VerticalScrollList';

interface IProps {
  userIds: Array<string>;
}

const UserAvatarList: React.FunctionComponent<IProps> = ({userIds}) => {
  return (
    <VerticalScrollList
      data={userIds}
      selectedIndex={0}
      keyExtractor={(x) => x}
      renderItem={({item, index}) => (
        <Padded size={index === 0 ? 0 : {left: 4}}>
          <UserAvatar diameter={45} userId={item} />
        </Padded>
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default UserAvatarList;
