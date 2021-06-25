import * as React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableOpacityProps
} from 'react-native';

import LinearGradient, {
  LinearGradientProps
} from 'react-native-linear-gradient';

type Variant = 'square' | 'oval';
type Colors = 'primary' | 'secondary';

interface IProps {
  color?: Colors;
  variant?: Variant;
  gutterBottom?: boolean;
  LinearGradientProps?: Partial<LinearGradientProps>;
  TouchableOpacityProps?: TouchableOpacityProps;
}

const getColorVariant = (color?: Colors) => {
  switch (color) {
    case 'secondary':
      return ['#020202', '#212221'];
    case 'primary':
    default:
      return ['#841517', '#AE1719'];
  }
};

const getStyleVariant = (variant?: Variant) => {
  switch (variant) {
    case 'square':
      return;
    case 'oval':
    default:
      return styles.variantOval;
  }
};

const GradientButton: React.SFC<IProps> = ({
  children,
  variant,
  color,
  gutterBottom,
  LinearGradientProps: { style, ...LGProps } = {} as LinearGradientProps,
  TouchableOpacityProps
}) => (
  <LinearGradient
    colors={getColorVariant(color)}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    angle={346}
    useAngle={true}
    style={[
      styles.gradient,
      style,
      getStyleVariant(variant),
      gutterBottom && styles.gutterBottom
    ]}
    {...LGProps}
  >
    <TouchableOpacity style={styles.button} {...TouchableOpacityProps}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  </LinearGradient>
);

const styles = StyleSheet.create({
  gutterBottom: {
    marginBottom: 12
  },
  variantOval: {
    borderRadius: 6
  },
  gradient: {
    width: '100%',
    height: 55
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent'
  },
  text: {
    fontFamily: 'Montserrat',
    color: '#FFF',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontStyle: 'italic',
    fontSize: 16
  }
});

export default GradientButton;
