import * as React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import BasicHeader from './BasicHeader';
import ScheduleMonthItem from './ScheduleMonthItem';
import ScheduleDateItem, { DATE_ITEM_WIDTH } from './ScheduleDateItem';
import ScheduleItem from './ScheduleItem';
import VerticalScrollList from './VerticalScrollList';

function daysOfMonth(date: moment.Moment) {
  const days = [];
  for (let i = 1; i <= date.daysInMonth(); i++) {
    days.push(
      date
        .clone()
        .date(i)
        .startOf()
    );
  }
  return days;
}

const ScheduleView = () => {
  const [currentDate, setCurrentDate] = React.useState(moment());

  const dateItems = React.useMemo(() => daysOfMonth(currentDate), [
    currentDate.month()
  ]);

  const dateOnPress = React.useCallback(
    (x: number) => {
      setCurrentDate(currentDate.clone().date(x));
    },
    [currentDate.format()]
  );

  const monthOnPress = React.useCallback(
    (x: number) => {
      setCurrentDate(currentDate.clone().month(x));
    },
    [currentDate.format()]
  );

  return (
    <View style={styles.root}>
      <BasicHeader title="Schedule" />
      <VerticalScrollList
        data={moment.months()}
        keyExtractor={item => item}
        selectedIndex={currentDate.month()}
        viewOffset={22}
        style={styles.monthFlatList}
        contentContainerStyle={styles.monthContainer}
        renderItem={({ item, index }) => (
          <ScheduleMonthItem
            selected={currentDate.format('MMMM') === item}
            onPress={() => monthOnPress(index)}
            fullWidth={index === 11}
          >
            {item}
          </ScheduleMonthItem>
        )}
      />
      <View style={styles.datePaper}>
        <LinearGradient
          colors={['#FFFFFFDD', '#FFFFFF00', '#FFFFFFDD']}
          locations={[0.15, 0.5, 0.85]}
          angle={90}
          useAngle={true}
          style={styles.datePaperGradient}
          pointerEvents="none"
        />
        <VerticalScrollList
          data={dateItems}
          keyExtractor={x => String(x.date())}
          contentContainerStyle={styles.dateContainer}
          getItemLayout={(item, index) => ({
            length: DATE_ITEM_WIDTH,
            offset: DATE_ITEM_WIDTH * index,
            index
          })}
          viewOffset={
            (Dimensions.get('screen').width - DATE_ITEM_WIDTH - 12) / 2
          }
          selectedIndex={currentDate.date() - 1}
          renderItem={({ item }) => (
            <ScheduleDateItem
              onPress={() => dateOnPress(item.date())}
              selected={currentDate.date() === item.date()}
              subtitle={item.format('ddd')}
            >
              {item.date()}
            </ScheduleDateItem>
          )}
        />
      </View>
      <FlatList
        keyExtractor={x => 'key:' + x}
        contentContainerStyle={[styles.scheduleContainer]}
        data={[1, 2]}
        renderItem={() => (
          <ScheduleItem
            title="Appointment with Mia"
            summary="Working on weight loss"
            gutterBottom
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  monthFlatList: {
    flexGrow: 0
  },
  monthContainer: {
    paddingTop: 8,
    paddingLeft: 22,
    paddingRight: 22
  },
  datePaperGradient: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    height: '100%',
    width: '100%'
  },
  datePaper: {
    position: 'relative',
    borderRadius: 6,
    marginRight: 12,
    marginLeft: 12,
    backgroundColor: '#FFF',
    shadowOffset: { width: 0, height: 14 },
    shadowRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05
  },
  dateContainer: {
    paddingTop: 22,
    paddingBottom: 16
  },
  scheduleContainer: {
    flexGrow: 1,
    paddingTop: 18
  }
});

export default ScheduleView;
