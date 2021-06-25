import * as React from 'react';
import {format} from 'date-fns';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

import Typography from './Typography';
import {BRAND_BLUE, LIGHT_GREY, MESSAGE_BUBBLE_GREY} from '../colors';
import {DATE_DIAMETER} from './Calendar';
import Padded from './Padded';
import RoundActionButton from './RoundActionButton';

interface IProps {
  onNextPress: () => void;
  onPrevPress: () => void;
  date: Date;
}

const CalendarHeader: React.FunctionComponent<IProps> = ({
  onNextPress,
  onPrevPress,
  date,
}) => {
  return (
    <Padded size={{bottom: 3}} style={styles.root}>
      <RoundActionButton
        onPress={onPrevPress}
        diameter={26}
        backgroundColor="#c4c3c7"
        disableDropShadow
        style={styles.spacing}>
        <IonIcon name="chevron-back" size={18} color="white" />
      </RoundActionButton>
      <Typography variant="calendarHeaderText" style={styles.center}>
        {format(date, 'MMMM, yyyy')}
      </Typography>
      <RoundActionButton
        diameter={26}
        backgroundColor="#c4c3c7"
        disableDropShadow
        onPress={onNextPress}
        style={styles.spacing}>
        <IonIcon name="chevron-forward" size={18} color="white" />
      </RoundActionButton>
    </Padded>
  );
};

const styles = StyleSheet.create({
  spacing: {
    width: DATE_DIAMETER,
    alignItems: 'center',
  },
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  center: {
    textAlign: 'center',
    flex: 1,
  },
});

export default CalendarHeader;
