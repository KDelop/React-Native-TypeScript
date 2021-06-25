import * as React from 'react';
import {View, ViewProps} from 'react-native';

type Padding = {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
};

export interface IProps extends ViewProps {
  size?: number | Padding;
}

export const BASE_PADDING = 4;

const Padded: React.FunctionComponent<IProps> = ({
  size = 1,
  style,
  ...rest
}) => {
  const paddingStyle =
    typeof size === 'number'
      ? {
          padding: BASE_PADDING * size,
        }
      : {
          paddingLeft: BASE_PADDING * (size.left ?? 0),
          paddingRight: BASE_PADDING * (size.right ?? 0),
          paddingTop: BASE_PADDING * (size.top ?? 0),
          paddingBottom: BASE_PADDING * (size.bottom ?? 0),
        };

  return <View style={[paddingStyle, style]} {...rest} />;
};

export default Padded;
