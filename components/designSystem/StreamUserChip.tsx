import * as React from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import {LIGHT_BRAND_RED} from '../colors';
import UserAvatar from '../UserAvatar';
import Padded from './Padded';
import Typography from './Typography';
import BlurView from './BlurView';

interface IProps extends TouchableOpacityProps {
  firstName: string;
  lastName: string;
  userId: string;
  isPro: boolean;
}

const StreamUserChip: React.FunctionComponent<IProps> = ({
  firstName,
  lastName,
  userId,
  isPro,
  ...rest
}) => {
  return (
    <TouchableOpacity {...rest}>
      <BlurView blurType="ultraThinMaterialDark" style={styles.root}>
        <Padded size={1} style={styles.innerPadding}>
          <UserAvatar
            diameter={36}
            userId={userId}
            openProfile={false}
            onPress={rest?.onPress}
          />
          <Padded size={{left: 2, right: 4}} style={styles.content}>
            <Typography variant="streamUserChipLabel">
              {firstName} {lastName}
            </Typography>
            <View style={styles.proLabel}>
              <IonIcon name="eye" size={14} color={LIGHT_BRAND_RED} />
              <Padded size={{left: 1}}>
                <Typography variant="streamUserChipSubLabel">
                  {isPro ? 'Pro' : 'Athlete'}
                </Typography>
              </Padded>
            </View>
          </Padded>
        </Padded>
      </BlurView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    borderRadius: 20,
  },
  innerPadding: {
    flexDirection: 'row',
  },
  content: {
    flex: 0,
    justifyContent: 'center',
  },
  proLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default StreamUserChip;
