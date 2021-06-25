import * as React from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {format} from 'date-fns';

import Padded from './designSystem/Padded';
import Typography from './designSystem/Typography';
import {IGenericParticipant} from '../types';
import FacePile from './designSystem/FacePile';
import {UserContext} from './UserProvider';
import {BRAND_BLUE, LIGHT_GREY} from './colors';
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

const ScheduleItem: React.FunctionComponent<IProps> = ({
  title,
  startAt,
  isFirstItem,
  attendees,
  type,
  initiatedBy,
  onPress,
}) => {
  const userContext = React.useContext(UserContext);

  return (
    <Padded size={{left: 3, right: 3, top: isFirstItem ? 5 : 0, bottom: 3}}>
      <Card disableDropShadow borderRadiusSize="small">
        <TouchableOpacity onPress={onPress}>
          <Padded
            size={{top: 3, bottom: 3, right: 4, left: 4}}
            style={styles.root}>
            <Padded size={{right: 5}}>
              {type === 'GROUP_CALL' ? (
                <IonIcon name="videocam" size={24} color={BRAND_BLUE} />
              ) : (
                <IonIcon name="radio-outline" size={24} color={BRAND_BLUE} />
              )}
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
                <View style={styles.timestamp}>
                  <Padded size={{right: 1}}>
                    <MaterialIcon
                      name="clock-time-seven"
                      size={12}
                      color={LIGHT_GREY}
                    />
                  </Padded>
                  <Typography variant="scheduleItemTertiary">
                    {format(startAt, 'p')}
                  </Typography>
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
      </Card>
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
  timestamp: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ScheduleItem;
