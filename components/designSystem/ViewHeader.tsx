import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {DROP_SHADOW} from '../colors';
import Padded from './Padded';
import BackButton from './BackButton';

export interface IProps {
  showBackButton?: boolean;
  dropShadowStyle?: 'none' | 'white-fade' | 'drop-shadow';
}

const ViewHeader: React.FunctionComponent<IProps> = ({
  showBackButton = true,
  dropShadowStyle = 'white-fade',
  children,
}) => {
  const {goBack} = useNavigation();

  return (
    <View
      style={[
        styles.root,
        dropShadowStyle === 'drop-shadow' && styles.dropShadow,
      ]}>
      <Padded
        size={{top: !showBackButton ? 3 : 0, left: 5, right: 5}}
        style={styles.content}>
        {showBackButton && (
          <Padded
            size={{top: 1, bottom: 4.5}}
            style={styles.backButtonContainer}>
            <BackButton onPress={() => goBack()} />
          </Padded>
        )}
        {children}
      </Padded>
      {dropShadowStyle === 'white-fade' && (
        <LinearGradient
          pointerEvents="none"
          colors={['#FFFFFFFF', '#FFFFFF00']}
          style={styles.gradient}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    zIndex: 10,
    elevation: 1,
  },
  content: {
    zIndex: 2,
    shadowOpacity: 0,
    elevation: 2,
  },
  dropShadow: {
    backgroundColor: '#fff',
    paddingBottom: 15,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowColor: DROP_SHADOW,
    shadowOffset: {
      height: 13,
      width: 0,
    },
  },
  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: -35,
    right: 0,
    width: '100%',
    height: 35,
    shadowOpacity: 0,
    elevation: 1,
  },
  backButtonContainer: {
    flex: 0,
    alignItems: 'flex-start',
  },
});

export default ViewHeader;
