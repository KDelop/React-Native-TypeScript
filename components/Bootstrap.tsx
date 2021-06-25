import * as React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
// import { Provider } from 'react-redux';

import App from './App';
// import store from '../stores/redux';
import SlideUpModalProvider from './SlideUpModalProvider';
import client from '../config/appSync';

const Bootstrap: React.SFC = () => (
  <ApolloProvider client={client}>
    {/* <Provider store={store}> */}
    <SlideUpModalProvider>
      <App />
    </SlideUpModalProvider>
    {/* </Provider> */}
  </ApolloProvider>
);

export default Bootstrap;
