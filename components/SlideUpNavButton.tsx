import * as React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps
} from 'react-native';

import { BRAND_BLUE } from '../constants/colors';
import Card from './Card';

const SlideUpNavButton: React.SFC<TouchableOpacityProps> = props => {
  return (
    <TouchableOpacity {...props}>
      <Card style={styles.root}>
        <FeatherIcon name="plus" color="#FFF" size={15} />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    marginLeft: 15,
    marginRight: 15,
    height: 50,
    width: 50,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: BRAND_BLUE,
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default SlideUpNavButton;
