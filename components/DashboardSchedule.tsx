import * as React from 'react';
import {StyleSheet} from 'react-native';
import {endOfDay, addHours, startOfSecond} from 'date-fns';
import {useNavigation} from '@react-navigation/native';

import DashboardScheduleItem from './DashboardScheduleItem';
import ListPlaceholder from './designSystem/ListPlaceholder';
import useSchedule from '../hooks/useSchedule';
import Divider from './designSystem/Divider';
import Padded from './designSystem/Padded';
import {BLUE_GREY} from './colors';
import {UserContext} from './UserProvider';

const DashboardSchedule = () => {
  const userContext = React.useContext(UserContext);
  const {navigate} = useNavigation();
  const renderStart = React.useRef(new Date()).current;
  const schedule = useSchedule({
    startDate: addHours(renderStart, -1).toISOString(),
    endDate: endOfDay(renderStart).toISOString(),
  });

  const scheduleItems = schedule.status === 'success' ? schedule.data : [];

  const navigateToGroupCall = (channelId: string) =>
    navigate('GroupCall', {channelId});

  const navigateToStream = (streamId: string, isHost: boolean) =>
    navigate('Stream', {streamId, isHost});

  return schedule.status === 'success' ? (
    <Padded size={{bottom: 2}} style={styles.schedule}>
      {scheduleItems.length === 0 && <ListPlaceholder.NoScheduledItems />}
      {scheduleItems.map((x, i) => (
        <React.Fragment key={x.id}>
          <DashboardScheduleItem
            attendees={x.attendees}
            title={x.title}
            startAt={parseInt(x.startAt)}
            type={x.type}
            description={x.description}
            isFirstItem={i === 0}
            onPress={() =>
              x.type === 'GROUP_CALL'
                ? navigateToGroupCall(x.id)
                : navigateToStream(
                    x.id,
                    x.initiatedBy?.id === userContext.user?.uid,
                  )
            }
            initiatedBy={{
              id: x.initiatedBy?.id,
              firstName: x.initiatedBy?.firstName,
              lastName: x.initiatedBy?.lastName,
            }}
          />
          {i < scheduleItems.length - 1 && (
            <Padded size={{left: 5, right: 5}}>
              <Divider color={BLUE_GREY} />
            </Padded>
          )}
        </React.Fragment>
      ))}
    </Padded>
  ) : (
    <ListPlaceholder.Loading />
  );
};

const styles = StyleSheet.create({
  schedule: {
    backgroundColor: 'white',
  },
});

export default DashboardSchedule;
