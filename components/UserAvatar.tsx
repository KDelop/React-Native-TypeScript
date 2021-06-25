import * as React from 'react';
import {
  GestureResponderEvent,
  ImageURISource,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';

import {LIGHT_BRAND_RED, LIGHT_GREY, MESSAGE_BUBBLE_GREY} from './colors';
import {useModal} from '../hooks/useModal';
import ProfilePicture, {IHandle} from './ProfilePicture';
import {FastImageProps} from 'react-native-fast-image';

type ImgSize = 'tiny' | 'small' | 'medium' | 'large';
type Halo = 'none' | 'red' | 'grey';

interface IProps extends TouchableOpacityProps {
  cache?: ImageURISource['cache'];
  halo?: Halo;
  haloWidth?: number;
  userId?: string;
  imgSize?: ImgSize;
  diameter?: number;
  openProfile?: boolean;
  style?: FastImageProps['style'];
}

const getDiameter = (size: ImgSize) => {
  switch (size) {
    case 'tiny':
      return 32;
    case 'small':
      return 56;
    case 'medium':
      return 128;
    case 'large':
      return 256;
  }
};

const getBorderStyle = (borderStyle: Halo, diameter: number, width = 4) => {
  if (borderStyle === 'none') return;

  const baseStyles: ViewStyle = {
    borderWidth: width,
    // Half the diameter + left and right padding
    borderRadius: diameter + 6 / 2,
    padding: 3,
  };

  switch (borderStyle) {
    case 'red':
      return {...baseStyles, borderColor: LIGHT_BRAND_RED};
    case 'grey':
      return {...baseStyles, borderColor: MESSAGE_BUBBLE_GREY};
  }
};

const UserAvatar = React.forwardRef(
  (
    {
      userId,
      cache,
      halo = 'none',
      haloWidth,
      imgSize = 'small',
      diameter,
      onPress,
      disabled,
      openProfile = true,
      style,
      ...rest
    }: IProps,
    ref: React.Ref<IHandle>,
  ) => {
    const openModal = useModal();
    const imgDiameter = diameter ?? getDiameter(imgSize);

    const handleOnPress = (e: GestureResponderEvent) => {
      onPress && onPress(e);

      if (openProfile && userId) {
        openModal('Profile', {userId});
      }
    };

    const inner = (
      <ProfilePicture
        ref={ref}
        userId={userId}
        imgSize={imgSize}
        style={[
          {
            height: imgDiameter,
            width: imgDiameter,
            borderRadius: imgDiameter / 2,
            borderColor: LIGHT_GREY,
          },
          style,
        ]}
      />
    );

    return (
      <View style={getBorderStyle(halo, imgDiameter, haloWidth)}>
        {handleOnPress ? (
          <TouchableOpacity
            delayPressIn={0}
            onPress={handleOnPress}
            {...rest}
            disabled={disabled}>
            {inner}
          </TouchableOpacity>
        ) : (
          inner
        )}
      </View>
    );
  },
);

export default UserAvatar;
