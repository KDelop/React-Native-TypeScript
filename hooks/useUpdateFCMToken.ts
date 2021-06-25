import * as React from 'react';
import messaging from '@react-native-firebase/messaging';
import {gql, useMutation} from '@apollo/client';

const UPDATE_FCM_TOKEN = gql`
  mutation UpdateFCMToken($token: String!) {
    updateFCMToken(token: $token) {
      id
    }
  }
`;

const useUpdateFCMToken = () => {
  const [mutate, {error, loading, data}] = useMutation(UPDATE_FCM_TOKEN);

  React.useEffect(() => {
    messaging()
      .getToken()
      .then((token) => mutate({variables: {token}}));

    return messaging().onTokenRefresh((token) => mutate({variables: {token}}));
  }, []);

  if (error) {
    return {
      status: 'error',
      data: error,
    };
  }

  if (loading) {
    return {
      status: 'loading',
      data: null,
    };
  }

  return {
    status: 'success',
    data: data?.updateFCMToken?.id,
  };
};

export default useUpdateFCMToken;
