import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  GestureResponderEvent
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from 'react-navigation-hooks';

import Typography from './Typography';
import { BRAND_BLUE } from '../constants/colors';

interface IProps {
  title?: React.ReactNode;
  actions?: React.ReactNode;
  backOnPress?: TouchableOpacityProps['onPress'];
}

const BasicHeader: React.SFC<IProps> = ({
  title,
  actions,
  backOnPress,
  children
}) => {
  const { goBack } = useNavigation();

  const handleBackOnPress = React.useCallback(
    (e: GestureResponderEvent) => {
      if (backOnPress) {
        return backOnPress(e);
      }

      goBack();
    },
    [backOnPress, goBack]
  );

  return (
    <View style={styles.root}>
      <View style={styles.centerContent}>
        {title && <Typography variant="title">{title}</Typography>}
        {children}
      </View>
      <TouchableOpacity onPress={handleBackOnPress}>
        <MaterialIcon
          style={styles.backButton}
          name="chevron-left"
          color={BRAND_BLUE}
          size={36}
        />
      </TouchableOpacity>
      <View style={styles.actions}>{actions}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    flex: 0,
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'center',
    minHeight: 90,
    shadowOffset: { height: 15, width: 0 },
    shadowRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    backgroundColor: '#fff',
    paddingLeft: '5%',
    paddingRight: '5%',
    zIndex: 10
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  backButton: {
    marginLeft: -8
  },
  centerContent: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 20,
    bottom: 0
  }
});

export default BasicHeader;
