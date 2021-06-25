import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import Typography from './Typography';
import { DEEP_RED } from '../constants/colors';

const DIAMETER = 175;
const BUTTON_DIAMETER = 40;

interface IProps {
  firstName: string;
}

const UploadAvatar: React.SFC<IProps> = ({ firstName }) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.button}>
          <TouchableOpacity>
            <Text style={styles.plus}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Typography style={styles.firstName}>{firstName}</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  plus: {
    color: DEEP_RED,
    fontSize: 26,
    lineHeight: BUTTON_DIAMETER
  },
  button: {
    width: BUTTON_DIAMETER,
    height: BUTTON_DIAMETER,
    backgroundColor: '#FFF',
    borderRadius: BUTTON_DIAMETER / 2,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 9,
    bottom: 2,
    shadowOffset: { width: -12, height: 16 },
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 30
  },
  firstName: {
    fontStyle: 'normal',
    fontSize: 24,
    textAlign: 'center'
  },
  container: {
    height: DIAMETER,
    width: DIAMETER,
    borderRadius: DIAMETER / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 12,
    position: 'relative'
  }
});

export default UploadAvatar;
