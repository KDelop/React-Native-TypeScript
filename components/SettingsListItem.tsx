import * as React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {MaterialIndicator} from 'react-native-indicators';
import {View, StyleSheet, TouchableOpacityProps} from 'react-native';

import Typography from './designSystem/Typography';
import {BRAND_BLUE, LIGHT_GREY} from './colors';
import Padded from './designSystem/Padded';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface IProps extends TouchableOpacityProps {
  icon: React.ReactNode;
  text: string;
  hideBorder?: boolean;
  loading?: boolean;
}

const SettingsListItem: React.FunctionComponent<IProps> = ({
  icon,
  text,
  hideBorder,
  loading,
  ...rest
}) => {
  return (
    <View>
      <TouchableOpacity {...rest}>
        <Padded size={{left: 5, right: 5, top: 4, bottom: 4}} {...rest}>
          <View style={[styles.content]}>
            {icon && <View style={styles.icon}>{icon}</View>}
            <Padded size={{left: icon ? 3 : 0}} style={styles.textContainer}>
              <Typography style={styles.text} variant="settingsItemPrimary">
                {text}
              </Typography>
            </Padded>
            {loading ? (
              <Padded style={{height: 24}} size={{right: 2}}>
                <MaterialIndicator
                  size={20}
                  trackWidth={2}
                  color={BRAND_BLUE}
                />
              </Padded>
            ) : (
              <MaterialIcon name="chevron-right" size={24} color={LIGHT_GREY} />
            )}
          </View>
        </Padded>
      </TouchableOpacity>
      {!hideBorder && (
        <Padded size={{left: 5, right: 5}}>
          <View style={styles.border} />
        </Padded>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  text: {},
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  border: {
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    borderBottomWidth: 1,
  },
});

export default SettingsListItem;
