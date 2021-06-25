import * as React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { SlideUpModalContext } from './SlideUpModalProvider';
import { IProps as ICardProps } from './Card';

export interface IProps {
  children: React.ReactNode;
  open: boolean;
  cardProps?: ICardProps;
  onRequestClose?: TouchableOpacityProps['onPress'];
  onAnimationEnd?(): void;
}

/**
 * Using the context api, this component forwards its props to the
 * SlideUpModalProvider which then passes those props to the SlideUpModalConsumer...
 * This basically mimics the functionality of portals in React-DOM
 */
export const SlideUpModal: React.SFC<IProps> = ({
  open,
  children,
  onRequestClose,
  onAnimationEnd,
  cardProps
}) => {
  return (
    <SlideUpModalContext.Consumer>
      {transport => {
        transport({
          open,
          children,
          onRequestClose,
          cardProps,
          onAnimationEnd
        });
        return null;
      }}
    </SlideUpModalContext.Consumer>
  );
};

export default SlideUpModal;
