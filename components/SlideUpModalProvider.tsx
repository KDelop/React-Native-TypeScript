import * as React from 'react';

import SlideUpModalConsumer from './SlideUpModalConsumer';
import { IProps as ISlideUpModalProps } from './SLideUpModal';

export const SlideUpModalContext = React.createContext<
  (consumerProps: ISlideUpModalProps) => void
>(x => x);

const SlideUpModalProvider: React.SFC = ({ children }) => {
  const [consumerProps, setConsumerProps] = React.useState<ISlideUpModalProps>({
    children: null,
    open: false
  });

  return (
    <SlideUpModalContext.Provider value={setConsumerProps}>
      {children}
      <SlideUpModalConsumer
        open={consumerProps?.open}
        onRequestClose={consumerProps?.onRequestClose}
        cardProps={consumerProps?.cardProps}
      >
        {consumerProps.children}
      </SlideUpModalConsumer>
    </SlideUpModalContext.Provider>
  );
};

export default SlideUpModalProvider;
