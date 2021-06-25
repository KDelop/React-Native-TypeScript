import * as React from 'react';
import {GestureResponderEvent, StyleSheet} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

import UserList from './UserList';
import Modal from './designSystem/Modal';
import {IProps as IModalProps} from './designSystem/Modal';
import {IUser, ModalManagerParamList} from '../types';
import {BRAND_BLUE, MESSAGE_BUBBLE_GREY} from './colors';

interface IProps extends IModalProps {
  params?: ModalManagerParamList['UserMultiSelect'];
}

const UserMultiSelectModal: React.FunctionComponent<IProps> = ({
  params,
  onRequestClose = () => {},
  ...rest
}) => {
  const [selection, setSelection] = React.useState<Record<string, IUser>>({});

  // Keep selection up to date with default
  React.useEffect(() => {
    if (params?.defaultSelectedUsers) {
      setSelection(
        params.defaultSelectedUsers.reduce(
          (acc, x) => ({...acc, [x.id]: x}),
          {},
        ),
      );
    }
  }, [params?.defaultSelectedUsers]);

  const removeUser = (user: IUser) =>
    setSelection((x) => {
      const {[user.id]: _, ...other} = x;
      params?.onChange?.(Object.values(other));
      return other;
    });

  const addUser = (user: IUser) =>
    setSelection((x) => {
      const newState = {...x, [user.id]: user};
      params?.onChange?.(Object.values(newState));
      return newState;
    });

  const toggleUser = (user: IUser) =>
    userIsSelected(user) ? removeUser(user) : addUser(user);

  const userIsSelected = (user: IUser) => Boolean(selection[user.id]);

  const handleRequestClose = (e: GestureResponderEvent) => {
    setSelection({});
    onRequestClose && onRequestClose(e);
  };

  return (
    <Modal onRequestClose={handleRequestClose} {...rest}>
      <UserList
        onUserClick={toggleUser}
        rightAdornmentRenderer={(user) => (
          <IonIcon
            name="ios-checkmark-circle"
            color={userIsSelected(user) ? BRAND_BLUE : MESSAGE_BUBBLE_GREY}
            size={28}
          />
        )}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({});

export default UserMultiSelectModal;
