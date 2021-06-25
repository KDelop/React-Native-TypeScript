import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';

import { LIGHT_GREY, MEDIUM_GREY, DARK_GREY } from '../constants/colors';
import Typography from './Typography';

interface IProps {
  title: React.ReactNode;
  summary: React.ReactNode;
  gutterBottom?: boolean;
}

const ScheduleItem: React.SFC<IProps> = ({ title, summary, gutterBottom }) => {
  return (
    <View style={[styles.container, gutterBottom && styles.gutterBottom]}>
      <AntIcon name="calendar" size={26} color={LIGHT_GREY} />
      <View style={[styles.textContainer]}>
        <Typography style={[styles.title]} variant="title2">
          {title}
        </Typography>
        <Typography style={[styles.summary]} variant="body2">
          {summary}
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#FFF',
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    marginLeft: 12,
    marginRight: 12
  },
  title: {
    color: DARK_GREY
  },
  summary: {
    color: MEDIUM_GREY
  },
  gutterBottom: {
    marginBottom: 12
  },
  textContainer: {
    marginLeft: 12
  }
});

export default ScheduleItem;
