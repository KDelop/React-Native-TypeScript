import * as React from 'react';
import * as Rx from 'rxjs';
import * as path from 'path';
import ImagePicker, {ImagePickerOptions} from 'react-native-image-picker';
import {mergeMap, tap, catchError, filter, map} from 'rxjs/operators';
import storage, {FirebaseStorageTypes} from '@react-native-firebase/storage';

import {UserContext} from '../components/UserProvider';

const showImagePicker = (options: ImagePickerOptions) =>
  new Promise<{uri: string; fileName: string | undefined}>(
    (resolve, reject) => {
      ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
          reject(new Error('User cancelled image picker'));
        } else if (response.error) {
          reject(new Error(`ImagePicker Error: ${response.error}`));
        } else if (response.customButton) {
          reject(
            new Error(`User tapped custom button: ${response.customButton}`),
          );
        } else {
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          resolve({uri: response.uri, fileName: response.fileName});
        }
      });
    },
  );

export const PROFILE_PICTURES_PATH = '/profilePictures';

interface IRefObject {
  fileName: string;
  uri: string;
  ref: FirebaseStorageTypes.Reference;
}

type Options = ImagePickerOptions & {onComplete(): void};

const useImageUpload = (options: Options) => {
  const userContext = React.useContext(UserContext);
  const subject = React.useRef(new Rx.Subject<Options>());
  const [error, setError] = React.useState<Error | null>(null);
  const [working, setWorking] = React.useState(false);

  const openImagePicker = () => {
    subject.current.next(options);
  };

  // TODO: Clean up this RX code to be a little less confusing...
  React.useEffect(() => {
    const sub = subject.current
      .pipe(
        tap(() => {
          setError(null);
          setWorking(false);
        }),
        mergeMap(showImagePicker),
        tap(() => setWorking(true)),
        map((x) => {
          if (userContext.user?.uid) {
            return {
              ...x,
              ref: storage().ref(
                path.join(
                  PROFILE_PICTURES_PATH,
                  userContext.user.uid,
                  x.fileName ?? `profileOriginal${path.extname(x.uri)}`,
                ),
              ),
            } as IRefObject;
          }
        }),
        filter((x): x is IRefObject => x !== undefined),
        mergeMap((x) => x.ref.putFile(x.uri)),
        tap(() => {
          setWorking(false);
          options?.onComplete();
        }),
        catchError((e, x) => {
          setWorking(false);
          setError(e);
          return x;
        }),
      )
      .subscribe();
    return () => sub.unsubscribe();
  }, []);

  return [error, working, openImagePicker] as const;
};

export default useImageUpload;
