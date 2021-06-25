import * as React from 'react';
import { PlaceholderMedia, Placeholder, Fade } from 'rn-placeholder';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from 'react-native';

import config from '../config.json';

const DIAMETER_SMALL = 40;
const DIAMETER_MEDIUM = 50;
const DIAMETER_LARGE = 60;
const DIAMETER_X_LARGE = 80;

interface IProps {
  loading: boolean;
  button?: boolean;
  TouchableOpacityProps?: TouchableOpacityProps;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  userId?: number;
}

const UserAvatar: React.SFC<IProps> = ({
  button = false,
  size = 'small',
  userId,
  loading,
  TouchableOpacityProps
}) => {
  if (loading) {
    return (
      <View
        style={[
          size === 'small' && styles.dimensionsSmall,
          size === 'large' && styles.dimensionsLarge,
          size === 'xlarge' && styles.dimensionsXLarge,
          size === 'medium' && styles.dimensionsMedium
        ]}
      >
        <Placeholder Animation={Fade}>
          <PlaceholderMedia
            style={[
              styles.container,
              size === 'small' && styles.dimensionsSmall,
              size === 'large' && styles.dimensionsLarge,
              size === 'xlarge' && styles.dimensionsXLarge,
              size === 'medium' && styles.dimensionsMedium
            ]}
          />
        </Placeholder>
      </View>
    );
  }

  return (
    <TouchableOpacity
      disabled={!button}
      style={[
        styles.container,
        size === 'small' && styles.dimensionsSmall,
        size === 'large' && styles.dimensionsLarge,
        size === 'xlarge' && styles.dimensionsXLarge,
        size === 'medium' && styles.dimensionsMedium
      ]}
      {...TouchableOpacityProps}
    >
      <Image
        style={[
          styles.image,
          size === 'small' && styles.dimensionsSmall,
          size === 'large' && styles.dimensionsLarge,
          size === 'xlarge' && styles.dimensionsXLarge,
          size === 'medium' && styles.dimensionsMedium
        ]}
        source={{
          uri: `${config.apiUri}/userData/${userId}/profile.jpg`
        }}
        defaultSource={require('../assets/images/default-profile.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dimensionsSmall: {
    height: DIAMETER_SMALL,
    width: DIAMETER_SMALL,
    borderRadius: DIAMETER_SMALL / 2
  },
  dimensionsLarge: {
    height: DIAMETER_LARGE,
    width: DIAMETER_LARGE,
    borderRadius: DIAMETER_LARGE / 2
  },
  dimensionsXLarge: {
    height: DIAMETER_X_LARGE,
    width: DIAMETER_X_LARGE,
    borderRadius: DIAMETER_X_LARGE / 2
  },
  dimensionsMedium: {
    height: DIAMETER_MEDIUM,
    width: DIAMETER_MEDIUM,
    borderRadius: DIAMETER_MEDIUM / 2
  },
  container: {
    // shadowOffset: { width: 0, height: 3 },
    // shadowRadius: 6,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    backgroundColor: '#FFF'
  },
  image: {
    resizeMode: 'cover'
  }
});

export default UserAvatar;
