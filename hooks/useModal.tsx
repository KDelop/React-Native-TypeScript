import * as React from 'react';

import {ModalManagerContext} from '../components/ModalManager';

export const useModal = () => {
  const {openModal} = React.useContext(ModalManagerContext);
  return openModal;
};
