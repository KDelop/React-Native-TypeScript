import * as React from 'react';
import {useMachine} from '@xstate/react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {isSameDay, format, isSameMonth, startOfMonth} from 'date-fns';

import {BLUE_GREY, BRAND_BLUE} from './colors';
import TitledViewHeader from './designSystem/TitledViewHeader';
import ScheduleItem from './ScheduleItem';
import Calendar from './designSystem/Calendar';
import Padded from './designSystem/Padded';
import ListPlaceholder from './designSystem/ListPlaceholder';
import {UserContext} from './UserProvider';
import scheduleMachine, {createScheduleKey} from '../machines/schedule';

const buildDateMapKey = (date: number | Date) => format(date, 'dd-MM-yyyy');

const ScheduleView = () => {
  const userContext = React.useContext(UserContext);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [state, dispatch] = useMachine(scheduleMachine);
  const {navigate} = useNavigation();

  const goToNewScheduleView = () => {
    navigate('NewScheduleItem');
  };

  const schedule =
    state.context.schedule[createScheduleKey(state.context.date)] ?? [];

  const todaysSchedule = schedule.filter((x) =>
    isSameDay(parseInt(x.startAt), selectedDate),
  );

  const navigateToGroupCall = (channelId: string) =>
    navigate('GroupCall', {channelId});

  const navigateToStream = (streamId: string, isHost: boolean) =>
    navigate('Stream', {streamId, isHost});

  const handleDayChange = React.useCallback((x) => setSelectedDate(x), []);
  const handleMonthChange = React.useCallback(
    (x) => {
      dispatch('MONTH_CHANGED', {
        date: x,
      });
    },
    [dispatch],
  );

  const handleBeforeMonthChange = React.useCallback((x: Date) => {
    if (!isSameMonth(x, new Date())) {
      setSelectedDate(startOfMonth(x));
    } else {
      setSelectedDate(new Date());
    }
  }, []);

  const isSelected = React.useCallback((x) => isSameDay(x, selectedDate), [
    selectedDate,
  ]);

  const markedDates = schedule.reduce(
    (acc, x) => ({
      ...acc,
      [buildDateMapKey(parseInt(x.startAt))]: true,
    }),
    {} as Record<string, boolean>,
  );

  return (
    <>
      <TitledViewHeader
        showBackButton={false}
        dropShadowStyle="none"
        title="Schedule"
        rightAdornment={
          <TouchableOpacity onPress={goToNewScheduleView}>
            <IonIcon name="ios-add" size={24} color={BRAND_BLUE} />
          </TouchableOpacity>
        }
      />
      <LinearGradient locations={[0, 0.3]} colors={['#f6f6f6', 'white']}>
        <Padded size={{left: 5, right: 5, top: 4, bottom: 4}}>
          <Calendar
            onDateClick={handleDayChange}
            onBeforeMonthChange={handleBeforeMonthChange}
            onMonthChange={handleMonthChange}
            isSelected={isSelected}
            markedDates={markedDates}
          />
        </Padded>
      </LinearGradient>
      <FlatList
        data={todaysSchedule}
        keyExtractor={(x) => x.id}
        style={{backgroundColor: BLUE_GREY}}
        ListEmptyComponent={() => {
          // if (scheduleResponse.status === 'loading') {
          //   //TODO: show loading indicator
          // }

          if (todaysSchedule.length === 0) {
            return (
              <Padded size={{top: 5}} style={styles.centerPlaceholder}>
                <ListPlaceholder.NoScheduledItems />
              </Padded>
            );
          }

          return null;
        }}
        renderItem={({item, index}) => {
          return (
            <ScheduleItem
              startAt={parseInt(item.startAt)}
              title={item.title}
              description={item.description}
              isFirstItem={index === 0}
              attendees={item.attendees}
              type={item.type}
              initiatedBy={{
                firstName: item.initiatedBy.firstName,
                lastName: item.initiatedBy.lastName,
                id: item.initiatedBy.id,
                isPro: item.initiatedBy.isPro,
              }}
              onPress={() =>
                item.type === 'GROUP_CALL'
                  ? navigateToGroupCall(item.id)
                  : navigateToStream(
                      item.id,
                      item.initiatedBy?.id === userContext?.user?.uid,
                    )
              }
            />
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  centerPlaceholder: {
    alignItems: 'center',
  },
});

export default ScheduleView;
