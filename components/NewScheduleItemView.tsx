import * as React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Switch,
} from 'react-native';

import {
  BRAND_BLUE,
  BRAND_RED,
  LIGHT_GREY,
  MEDIUM_GREY,
  MESSAGE_BUBBLE_GREY,
} from './colors';
import BackButton from './designSystem/BackButton';
import Padded from './designSystem/Padded';
import Typography from './designSystem/Typography';
import Divider from './designSystem/Divider';
import {format} from 'date-fns';
import UserAvatarList from './UserAvatarList';
import RoundActionButton from './designSystem/RoundActionButton';
import {IUser, ScheduleEventTypes} from '../types';
import GradientButton from './designSystem/GradientButton';
import {useModal} from '../hooks/useModal';
import useAddScheduleItem from '../hooks/useAddScheduleItem';
import {add} from 'date-fns/esm';

const NewScheduleItemView = () => {
  const {navigate, goBack} = useNavigation();
  const openModal = useModal();
  const [addScheduleItem, addScheduleItemResponse] = useAddScheduleItem();
  const textFieldRef = React.useRef<TextInput>(null);
  const [attendees, setAttendees] = React.useState<Array<IUser>>([]);
  const [datePickerHidden, setDatePickerHidden] = React.useState(true);
  const [date, setDate] = React.useState(new Date());
  const [description, setDescription] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [eventType, setEventType] = React.useState<ScheduleEventTypes>(
    'STREAM',
  );

  const handleSubmit = async () => {
    try {
      await addScheduleItem({
        title,
        description,
        startAt: date.toISOString(),
        type: eventType,
        attendees: attendees.map((x) => ({
          id: x.id,
          firstName: x.firstName,
          lastName: x.lastName,
        })),
      });
      navigate('Schedule');
    } catch (e) {
      console.log(e);
    }
  };

  const focusTextField = () => {
    textFieldRef.current?.focus();
  };

  const toggleDatePicker = () => {
    setDatePickerHidden((x) => !x);
  };

  const makeOnEventTypeChangeHandler = (eventType: ScheduleEventTypes) => (
    value: boolean,
  ) => {
    switch (eventType) {
      case 'STREAM':
        return setEventType(value ? 'STREAM' : 'GROUP_CALL');
      case 'GROUP_CALL':
        return setEventType(value ? 'GROUP_CALL' : 'STREAM');
    }
  };

  const openUserMutliSelect = () => {
    openModal('UserMultiSelect', {
      defaultSelectedUsers: attendees,
      onChange: (selection) => setAttendees(selection),
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        <Padded
          size={{left: 5, right: 5, top: 1, bottom: 4.5}}
          style={styles.backButtonContainer}>
          <BackButton color={BRAND_RED} onPress={() => goBack()}>
            Cancel
          </BackButton>
        </Padded>
        <Padded size={{left: 5, right: 5}} style={styles.textInputContainer}>
          <TextInput
            placeholder="Title..."
            value={title}
            onChangeText={setTitle}
            style={styles.textInput}
            placeholderTextColor={MESSAGE_BUBBLE_GREY}
            ref={textFieldRef}
          />
          <TouchableOpacity onPress={focusTextField}>
            <Padded size={{left: 2}}>
              <MaterialIcon name="pencil" size={20} color={LIGHT_GREY} />
            </Padded>
          </TouchableOpacity>
        </Padded>
        <Padded size={{top: 3, bottom: 4, left: 5, right: 5}}>
          <Divider />
          <TouchableOpacity onPress={toggleDatePicker}>
            <Padded
              size={{top: 4, bottom: 4}}
              style={styles.datePickerValueContainer}>
              <Typography variant="datePickerValueLabel">Start</Typography>
              <View style={styles.datePickerValueDateContainer}>
                <Padded size={{right: 4}}>
                  <Typography variant="datePickerValueLabel">
                    {format(date, 'LLL d, yyyy')}
                  </Typography>
                </Padded>
                <Typography variant="datePickerValueLabel">
                  {format(date, 'p')}
                </Typography>
              </View>
            </Padded>
          </TouchableOpacity>
          {!datePickerHidden && (
            <View style={[styles.dateTimePickerContainer]}>
              <DateTimePicker
                display="spinner"
                mode="datetime"
                value={date}
                onChange={(e, date) => date && setDate(date)}
              />
            </View>
          )}
          <Divider />
        </Padded>
        <Padded size={{left: 5, right: 5}}>
          <Typography variant="greyLabel">Description:</Typography>
          <Padded size={{top: 4, bottom: 4}}>
            <TextInput
              onChangeText={setDescription}
              value={description}
              placeholder="Write something..."
              multiline={true}
            />
          </Padded>
          <Typography variant="greyLabel">Add people to event:</Typography>
          <Padded size={{top: 4, bottom: 4}} style={styles.addPeopleContainer}>
            <Padded size={{right: 4}}>
              <RoundActionButton
                onPress={openUserMutliSelect}
                backgroundColor="rgba(0, 0, 0, 0.05)"
                diameter={45}
                style={{flex: 0}}>
                <MaterialIcon name="plus-minus" size={26} color={MEDIUM_GREY} />
              </RoundActionButton>
            </Padded>
            <UserAvatarList userIds={attendees.map((x) => x.id)} />
          </Padded>
          <Typography variant="greyLabel">Event type:</Typography>
          <Padded size={{top: 8, bottom: 3}} style={styles.radioFieldContainer}>
            <Typography variant="radioFieldLabel">Live Stream</Typography>
            <Switch
              trackColor={{
                true: BRAND_BLUE,
                false: MESSAGE_BUBBLE_GREY,
              }}
              onValueChange={makeOnEventTypeChangeHandler('STREAM')}
              value={eventType === 'STREAM'}
            />
          </Padded>
          <Divider />
          <Padded size={{top: 8, bottom: 3}} style={styles.radioFieldContainer}>
            <Typography variant="radioFieldLabel">1:1 Video Chat</Typography>
            <Switch
              trackColor={{
                true: BRAND_BLUE,
                false: MESSAGE_BUBBLE_GREY,
              }}
              onValueChange={makeOnEventTypeChangeHandler('GROUP_CALL')}
              value={eventType === 'GROUP_CALL'}
            />
          </Padded>
          <Divider />
          <Padded size={{top: 15}}>
            <GradientButton onPress={handleSubmit}>CREATE</GradientButton>
          </Padded>
        </Padded>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  textInput: {
    color: '#111',
    fontSize: 26,
    fontFamily: 'Montserrat-ExtraBoldItalic',
    flexGrow: 1,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  datePickerValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  datePickerValueDateContainer: {
    flexDirection: 'row',
  },
  dateTimePickerContainer: {},
  addPeopleContainer: {
    flexDirection: 'row',
  },
  radioFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default NewScheduleItemView;
