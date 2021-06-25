import * as React from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';

import RoundActionButton, {
  IProps as IRoundActionButtonProps,
} from './designSystem/RoundActionButton';
import Padded from './designSystem/Padded';

interface IProps {
  onPress: IRoundActionButtonProps['onPress'];
}

const StreamSendButton: React.FunctionComponent<IProps> = ({onPress}) => {
  return (
    <RoundActionButton diameter={46} cardColor="red" onPress={onPress}>
      <Padded size={{right: 1, top: 0.5}}>
        <IonIcon name="paper-plane-sharp" size={22} color="white" />
      </Padded>
    </RoundActionButton>
  );
};

export default StreamSendButton;
