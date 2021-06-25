import * as React from 'react';

import {ModalManagerParamList} from '../types';
import CalendarModal from './CalendarModal';
import ConnectModal from './ConnectModal';
import ProfileModal from './ProfileModal';
import UserMultiSelectModal from './UserMultiSelectModal';

type ValueOf<T> = T[keyof T];
type Context = {
  id: keyof ModalManagerParamList | undefined;
  params: ValueOf<ModalManagerParamList> | undefined;
  openModal: <T extends keyof ModalManagerParamList>(
    ...args: undefined extends ModalManagerParamList[T]
      ? [T] | [T, ModalManagerParamList[T]]
      : [T, ModalManagerParamList[T]]
  ) => void;
  closeModal: () => void;
};

export const ModalManagerContext = React.createContext<Context>({
  id: undefined,
  params: undefined,
  openModal: () => {},
  closeModal: () => {},
});

const ModalManagerProvider: React.FunctionComponent = ({children}) => {
  const [contextData, setContextData] = React.useState<
    Pick<Context, 'id' | 'params'>
  >({
    id: undefined,
    params: undefined,
  });

  function openModal<T extends keyof ModalManagerParamList>(
    ...args: undefined extends ModalManagerParamList[T]
      ? [T] | [T, ModalManagerParamList[T]]
      : [T, ModalManagerParamList[T]]
  ) {
    setContextData({id: args[0], params: args[1]});
  }

  const closeModal = () => setContextData({id: undefined, params: undefined});

  return (
    <ModalManagerContext.Provider
      value={{...contextData, openModal, closeModal}}>
      {children}
      <UserMultiSelectModal
        open={contextData.id === 'UserMultiSelect'}
        onRequestClose={closeModal}
        params={contextData.params}
      />
      <CalendarModal
        open={contextData.id === 'Calendar'}
        onRequestClose={closeModal}
        params={contextData.params}
      />
      <ProfileModal
        open={contextData.id === 'Profile'}
        onRequestClose={closeModal}
        params={contextData.params}
      />
      <ConnectModal
        open={contextData.id === 'Connect'}
        onRequestClose={closeModal}
        params={contextData.params}
      />
    </ModalManagerContext.Provider>
  );
};

export default ModalManagerProvider;
