import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import Typography from './designSystem/Typography';
import {MaterialIndicator} from 'react-native-indicators';
import {BRAND_BLUE, BRAND_RED} from './colors';
import Padded from './designSystem/Padded';

const WaitingForHostView = () => {
  return (
    <View style={styles.root}>
      <Padded size={{bottom: 3}}>
        <MaterialIndicator
          size={24}
          trackWidth={2}
          color={BRAND_RED}
          style={styles.indicator}
        />
      </Padded>
      <Typography variant="waitingForHostText">Waiting for host...</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    flex: 0,
  },
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WaitingForHostView;
