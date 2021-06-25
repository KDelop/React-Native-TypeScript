import * as React from 'react';
import {StyleSheet, View} from 'react-native';

import {MESSAGE_BUBBLE_GREY} from '../colors';
import UserAvatar from '../UserAvatar';
import Card from './Card';
import Padded from './Padded';
import Typography from './Typography';

interface IProps {
  userIds: Array<string>;
  maxFaces?: number;
}

const DIAMETER = 32;

const FacePile: React.FunctionComponent<IProps> = ({userIds, maxFaces = 3}) => {
  const renderMoreCircle = maxFaces < userIds.length;
  const moreCircleText = userIds.length - maxFaces;

  return (
    <View style={styles.root}>
      {userIds.slice(0, maxFaces).map((x, i) => (
        <Padded
          key={x}
          size={i < userIds.length - 1 || renderMoreCircle ? {right: 2} : 0}
          style={i !== userIds.length - 1 && styles.face}>
          <UserAvatar
            userId={x}
            diameter={DIAMETER}
            style={styles.userAvatar}
          />
        </Padded>
      ))}
      {renderMoreCircle && (
        <Card
          color="red"
          style={[styles.moreCircleContainer, styles.userAvatar]}>
          <Typography variant="facepilePlusText">+{moreCircleText}</Typography>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  face: {
    flexShrink: 0,
    marginRight: -14,
    width: DIAMETER,
    borderRadius: DIAMETER,
  },
  moreCircleContainer: {
    width: DIAMETER,
    height: DIAMETER,
    borderRadius: DIAMETER / 2,
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatar: {
    borderWidth: 1,
    borderColor: 'white',
  },
});

export default FacePile;
