import * as React from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {format} from 'date-fns';

import Padded from './designSystem/Padded';
import Typography from './designSystem/Typography';
import {IGenericParticipant} from '../types';
import FacePile from './designSystem/FacePile';
import {UserContext} from './UserProvider';
import {LIGHT_GREY} from './colors';
import Badge from './designSystem/Badge';
import Card from './designSystem/Card';

interface IProps {
  title: string;
  description: string;
  startAt: number;
  isFirstItem: boolean;
  attendees: Array<IGenericParticipant>;
  type: 'STREAM' | 'GROUP_CALL';
  initiatedBy: IGenericParticipant;
  onPress(): void;
}

const DashboardScheduleItem: React.FunctionComponent<IProps> = ({
  title,
  description,
  startAt,
  isFirstItem,
  attendees,
  type,
  initiatedBy,
  onPress,
}) => {
  const userContext = React.useContext(UserContext);

  return (
    <Padded size={{top: isFirstItem ? 3 : 1, bottom: 1, left: 4}}>
      <TouchableOpacity onPress={onPress}>
        <Padded
          size={{top: 3, bottom: 3, right: 5, left: 5}}
          style={styles.root}>
          <Padded size={{right: 5}}>
            <Card color="red" borderRadiusSize="none" style={styles.timeCard}>
              <Padded size={{left: 1, right: 1, top: 2.5, bottom: 2.5}}>
                <Typography variant="dashboardScheduleItemTime">
                  {format(startAt, 'h:mm')}
                </Typography>
                <Typography variant="dashboardScheduleItemPeriod">
                  {format(startAt, 'a')}
                </Typography>
              </Padded>
            </Card>
          </Padded>
          <View style={styles.content}>
            <View>
              <Typography variant="scheduleItemTitle">{title}</Typography>
              <Padded size={{bottom: 1, top: 0.5}}>
                <Typography variant="scheduleItemDescription">
                  {initiatedBy.firstName} {initiatedBy.lastName} //{' '}
                  {initiatedBy.isPro ? 'Pro' : 'Athlete'}
                </Typography>
              </Padded>
              <View style={styles.tertiary}>
                <Padded size={{right: 1}}>
                  {type === 'GROUP_CALL' ? (
                    <IonIcon name="videocam" size={12} color={LIGHT_GREY} />
                  ) : (
                    <IonIcon
                      name="radio-outline"
                      size={12}
                      color={LIGHT_GREY}
                    />
                  )}
                </Padded>
                <View>
                  <Typography variant="scheduleItemTertiary">
                    {type === 'GROUP_CALL' ? 'Video Call' : 'Stream'}
                  </Typography>
                </View>
              </View>
            </View>
            {attendees.length > 1 ? (
              <FacePile
                userIds={attendees
                  .map((x) => x.id)
                  .filter((x) => x !== userContext.user?.uid)}
              />
            ) : (
              <Badge>PUBLIC</Badge>
            )}
          </View>
        </Padded>
      </TouchableOpacity>
    </Padded>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tertiary: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeCard: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    width: 48,
  },
});

export default DashboardScheduleItem;
