import * as React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  getDate,
  startOfMonth,
  startOfWeek,
  eachWeekOfInterval,
  endOfWeek,
  format,
  isSameMonth,
} from 'date-fns';

import CalendarHeader from './CalendarHeader';
import Typography from './Typography';
import Card from './Card';
import Divider from './Divider';
import Padded from './Padded';
import NotificationBubble from './NotificationBubble';
import {LIGHT_BRAND_BLUE} from '../colors';

interface IProps {
  startDate?: Date;
  isSelected?(x: Date): boolean;
  markedDates: Record<string, boolean>;
  onDateClick?(x: Date): void;
  onMonthChange?(x: Date): void;
  onBeforeMonthChange?(x: Date): void;
}

export const DATE_DIAMETER = 30;

const dotw = eachDayOfInterval({
  start: startOfWeek(new Date()),
  end: endOfWeek(new Date()),
});

const Calendar: React.FunctionComponent<IProps> = ({
  startDate = new Date(),
  onDateClick,
  onMonthChange,
  onBeforeMonthChange,
  isSelected,
  markedDates,
}) => {
  const [date, setDate] = React.useState(startDate);
  const goToNextMonth = () => {
    const newDate = addMonths(date, 1);
    onBeforeMonthChange?.(newDate);
    setDate(newDate);
  };
  const goToPrevMonth = () => {
    const newDate = addMonths(date, -1);
    onBeforeMonthChange?.(newDate);
    setDate(newDate);
  };

  React.useEffect(() => {
    onMonthChange?.(date);
  }, [date]);

  const inner = React.useMemo(() => {
    const monthMatrix = eachWeekOfInterval({
      start: startOfWeek(startOfMonth(date)),
      end: endOfWeek(endOfMonth(date)),
    }).map((x) =>
      eachDayOfInterval({
        start: startOfWeek(x),
        end: endOfWeek(x),
      }),
    );

    const weeks = [];
    for (const week of monthMatrix) {
      const days = [];
      for (const day of week) {
        const isSelectedDay = isSelected && isSelected(day);
        days.push(
          <View key={day?.toISOString?.()} style={styles.date}>
            <TouchableOpacity
              onPress={() => onDateClick && onDateClick(day)}
              style={[styles.spacing]}>
              <Card
                color={isSelectedDay ? 'red' : 'none'}
                disableDropShadow={true}
                style={styles.card}>
                <Typography
                  variant={
                    isSelectedDay
                      ? 'calendarDateSelected'
                      : isSameMonth(day, date)
                      ? 'calendarDate'
                      : 'calendarDateOutsideOfMonth'
                  }>
                  {getDate(day)}
                </Typography>
                {markedDates?.[format(day, 'dd-MM-yyyy')] && (
                  <View style={styles.notificationBubble}>
                    <NotificationBubble
                      diameter={4}
                      color={isSelectedDay ? 'white' : LIGHT_BRAND_BLUE}
                    />
                  </View>
                )}
              </Card>
            </TouchableOpacity>
          </View>,
        );
      }

      weeks.push(
        <View key={week?.[0]?.toISOString?.()} style={styles.week}>
          {days}
        </View>,
      );
    }

    return weeks;
  }, [isSelected, markedDates, onDateClick, date]);

  return (
    <View>
      <CalendarHeader
        date={date}
        onNextPress={goToNextMonth}
        onPrevPress={goToPrevMonth}
      />
      <View>
        <Padded size={{bottom: 1}} style={styles.dotwHeader}>
          {dotw.map((x) => (
            <View key={x?.toISOString?.()} style={styles.dotw}>
              <View style={styles.spacing}>
                <Typography variant="calendarDotw">{format(x, 'E')}</Typography>
              </View>
            </View>
          ))}
        </Padded>
        <Padded size={{top: 1}} style={styles.month}>
          {inner}
        </Padded>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: DATE_DIAMETER,
    height: DATE_DIAMETER,
    borderRadius: DATE_DIAMETER / 2,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  spacing: {
    borderRadius: DATE_DIAMETER / 2,
    width: DATE_DIAMETER,
    height: DATE_DIAMETER,
    justifyContent: 'center',
    alignItems: 'center',
  },
  month: {
    height: 210,
    justifyContent: 'space-between',
  },
  week: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dotwHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dotw: {
    flex: 0,
    alignItems: 'center',
  },
  date: {
    flex: 0,
    alignItems: 'center',
  },
  notificationBubble: {
    position: 'absolute',
    bottom: 2,
  },
});

export default Calendar;
