import * as React from 'react';
import Toast from 'react-native-toast-message';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import {View, SafeAreaView, StyleSheet} from 'react-native';

import {DARK_GREY} from '../colors';
import RoundActionButton from './RoundActionButton';
import Typography from './Typography';

interface IProps {
  primaryText?: string;
  secondaryText?: string;
}

const RoundToast: React.FunctionComponent<IProps> = ({
  primaryText,
  secondaryText,
}) => {
  return (
    <SafeAreaView>
      <View style={styles.root}>
        <View style={styles.textContainer}>
          <Typography variant="roundToastPrimary">{primaryText}</Typography>
          {secondaryText && (
            <Typography variant="roundToastSecondary">
              {secondaryText}
            </Typography>
          )}
        </View>
        <RoundActionButton
          diameter={34}
          cardColor="red"
          onPress={() => Toast.hide()}>
          <SimpleLineIcon name="close" size={18} color="white" />
        </RoundActionButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    backgroundColor: DARK_GREY,
    paddingLeft: 24,
    paddingRight: 3,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 30,
  },
  textContainer: {
    marginRight: 10,
    flex: 0,
    justifyContent: 'center',
  },
});

export default RoundToast;
