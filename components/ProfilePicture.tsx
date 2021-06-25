import * as React from 'react';
import * as path from 'path';
import FastImage, {FastImageProps} from 'react-native-fast-image';

import {PROFILE_PICTURES_PATH} from '../hooks/useImageUpload';
import useCachedDownloadURL from '../hooks/useCachedDownloadURL';
import useTimeout from '../hooks/useTimeout';

type ImgSize = 'tiny' | 'small' | 'medium' | 'large';

interface IProps extends Omit<FastImageProps, 'source'> {
  userId?: string;
  imgSize?: ImgSize;
}

export interface IHandle {
  refresh(): void;
}

const defaultProfilePic = require('../assets/images/default-profile.png');

const getImageSize = (size: ImgSize) => {
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

const getImageName = (diameter: number) => {
  if (diameter <= 64) {
    return 'profile@64';
  }

  if (diameter <= 128) {
    return 'profile@128';
  }

  return 'profileOriginal';
};

const ProfilePicture = React.forwardRef(
  ({userId, imgSize = 'small', ...rest}: IProps, ref: React.Ref<IHandle>) => {
    const imageName = getImageSize(imgSize);
    const setTimeout = useTimeout();
    const [profilePicURI, refetch] = useCachedDownloadURL(
      userId
        ? path.join(
            PROFILE_PICTURES_PATH,
            userId,
            `${getImageName(imageName)}.jpg`,
          )
        : undefined,
    );

    React.useImperativeHandle(ref, () => ({
      refresh: () => setTimeout(refetch, 1000),
    }));

    return (
      <>
        <FastImage
          key={profilePicURI}
          source={
            profilePicURI
              ? {
                  uri: profilePicURI,
                }
              : defaultProfilePic
          }
          {...rest}
        />
      </>
    );
  },
);

export default ProfilePicture;
