import * as React from 'react';
import {ImageBackground} from 'react-native';

import AppContainer from './designSystem/AppContainer';

const welcomeImage = require('../assets/images/welcome.png');

const OnboardingView: React.FunctionComponent = ({children}) => {
  return (
    <ImageBackground
      source={welcomeImage}
      style={{width: '100%', height: '100%', backgroundColor: 'black'}}>
      <AppContainer
        style={{backgroundColor: 'transparent'}}
        statusBarStyle="light-content">
        {children}
      </AppContainer>
    </ImageBackground>
  );
};

export default OnboardingView;
