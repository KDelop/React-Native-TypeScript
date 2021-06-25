import * as React from 'react';
import {StyleSheet} from 'react-native';

import Modal from './designSystem/Modal';
import {IProps as IModalProps} from './designSystem/Modal';
import {ModalManagerParamList} from '../types';
import Calendar from './designSystem/Calendar';
import Padded from './designSystem/Padded';

interface IProps extends IModalProps {
  params?: ModalManagerParamList['Calendar'];
}

const CalendarModal: React.FunctionComponent<IProps> = ({
  params,
  onRequestClose = () => {},
  ...rest
}) => {
  return (
    <Modal onRequestClose={onRequestClose} {...rest}>
      <Padded size={{top: 8, bottom: 12, left: 5, right: 5}}>
        <Calendar />
      </Padded>
    </Modal>
  );
};

const styles = StyleSheet.create({});

export default CalendarModal;
