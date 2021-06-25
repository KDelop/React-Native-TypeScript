import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  TouchableOpacity
} from 'react-native';

interface IProps extends TouchableOpacityProps {
  icon: React.ReactNode;
  label: React.ReactNode;
}

const SlideUpNavItem: React.SFC<IProps> = ({ icon, label, ...rest }) => {
  return (
    <TouchableOpacity style={styles.root} {...rest}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 0,
    alignItems: 'center'
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFFFFF10',
    marginBottom: 10,
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontFamily: 'Montserrat',
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800',
    fontStyle: 'italic',
    textTransform: 'uppercase'
  }
});

export default SlideUpNavItem;
