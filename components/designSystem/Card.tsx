import * as React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BlurView from './BlurView';

export interface IProps extends ViewProps {
  borderRadiusSize?: 'none' | 'small' | 'medium' | 'large';
  color?: 'red' | 'blue' | 'white' | 'blur' | 'none';
  disableDropShadow?: boolean;
}

const getColorVariant = (color?: IProps['color']) => {
  switch (color) {
    case 'blue':
      return ['#1c2137', '#142a4a'];
    case 'red':
      return ['#AE1719', '#841517'];
    default:
      return [];
  }
};

const getBorderRadiusVariant = (variant: IProps['borderRadiusSize']) => {
  switch (variant) {
    case 'none':
      return styles.noneBorderRadius;
    case 'small':
      return styles.smallBorderRadius;
    case 'large':
      return styles.largeBorderRadius;
  }
};

const Card: React.FunctionComponent<IProps> = ({
  disableDropShadow,
  borderRadiusSize = 'medium',
  color = 'white',
  children,
  style,
  ...rest
}) => {
  const styleArr = [
    styles.root,
    !disableDropShadow && styles.dropShadow,
    getBorderRadiusVariant(borderRadiusSize),
    color === 'none' && styles.backgroundTransparent,
    style,
  ];

  if (color === 'blur') {
    return (
      <View
        style={[
          styleArr,
          {backgroundColor: 'transparent', overflow: 'hidden'},
        ]}>
        <BlurView
          blurType="thinMaterialDark"
          blurAmount={2}
          reducedTransparencyFallbackColor="black">
          {children}
        </BlurView>
      </View>
    );
  }

  if (color === 'blue' || color === 'red') {
    return (
      <View style={style}>
        <LinearGradient
          colors={getColorVariant(color)}
          angle={178}
          useAngle={true}
          style={styleArr}>
          {children}
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styleArr} {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  noneBorderRadius: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  smallBorderRadius: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  largeBorderRadius: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  root: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: 'white',
  },
  dropShadow: {
    shadowColor: '#464656',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 6,
  },
  backgroundTransparent: {
    backgroundColor: 'transparent',
  },
});

export default Card;
