import * as React from 'react';
import {TouchableOpacity, SafeAreaView} from 'react-native';
import {StyleSheet} from 'react-native';
import Card from './designSystem/Card';
import Padded from './designSystem/Padded';
import Typography from './designSystem/Typography';
import UserAvatar from './UserAvatar';

interface IProps {
  userId?: string;
  title?: string;
  description?: string;
  onPress?: () => void;
}

const UserToast: React.FunctionComponent<IProps> = ({
  userId,
  title,
  description,
  onPress,
}) => {
  return (
    <SafeAreaView style={styles.root}>
      <Padded size={{top: 1, left: 5, right: 5}}>
        <TouchableOpacity activeOpacity={1} onPress={onPress}>
          <Card borderRadiusSize="small">
            <Padded
              size={{left: 3, right: 3, top: 2, bottom: 2}}
              style={styles.inner}>
              {userId && <UserAvatar diameter={34} userId={userId} />}
              <Padded size={{left: 2}} style={styles.textContainer}>
                <Typography variant="toastTitle">{title}</Typography>
                <Typography variant="toastDescription">
                  {description}
                </Typography>
              </Padded>
            </Padded>
          </Card>
        </TouchableOpacity>
      </Padded>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  textContainer: {
    flexShrink: 1,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '100%',
  },
});

export default UserToast;
