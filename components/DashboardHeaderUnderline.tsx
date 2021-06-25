import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {MESSAGE_BUBBLE_GREY} from './colors';
import Padded from './designSystem/Padded';

const DashboardHeaderUnderline = () => {
  return (
    <Padded size={{left: 5}}>
      <View style={styles.root}>
        <LinearGradient
          angle={340}
          useAngle={true}
          colors={['#AE1719', '#841517']}
          style={styles.red}
        />
      </View>
    </Padded>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 4,
    backgroundColor: MESSAGE_BUBBLE_GREY,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  red: {
    width: 125,
    height: 4,
    borderRadius: 2,
  },
});

export default DashboardHeaderUnderline;
