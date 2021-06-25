import * as React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export interface IProps extends ViewProps {
  borderRadiusSize?: 'small' | 'medium' | 'large';
  color?: 'red' | 'blue' | 'white';
}

const getColorVariant = (color?: IProps['color']) => {
  switch (color) {
    case 'blue':
      return ['#1c3354', '#142b4a'];
    case 'red':
      return ['#841517', '#AE1719'];
    default:
      return [];
  }
};

const getBorderRadiusVariant = (variant: IProps['borderRadiusSize']) => {
  switch (variant) {
    case 'small':
      return styles.smallBorderRadius;
    case 'large':
      return styles.largeBorderRadius;
  }
};

const Card: React.SFC<IProps> = ({
  borderRadiusSize = 'medium',
  color = 'white',
  children,
  style,
  ...rest
}) => {
  const styleArr = [
    styles.root,
    style,
    getBorderRadiusVariant(borderRadiusSize)
  ];

  if (color === 'blue' || color === 'red') {
    return (
      <View style={style}>
        <LinearGradient
          colors={getColorVariant(color)}
          angle={175}
          useAngle={true}
          style={styleArr}
        >
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
  smallBorderRadius: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  largeBorderRadius: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40
  },
  root: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2
  }
});

export default Card;
