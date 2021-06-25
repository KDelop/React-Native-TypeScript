import {gql, NetworkStatus, useQuery} from '@apollo/client';

import {IStream, Data} from '../types';

const STREAM_QUERY = gql`
  query Stream($streamId: String!) {
    stream(streamId: $streamId) {
      id
      title
      description
      startAt
      initiatedBy {
        id
        firstName
        lastName
        isPro
      }
    }
  }
`;

const useStream = (streamId: string): Data<IStream> => {
  const {error, data, networkStatus} = useQuery(STREAM_QUERY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      streamId,
    },
  });

  if (error) {
    return {
      status: 'error',
      data: error,
    };
  }

  if (networkStatus === NetworkStatus.loading) {
    return {
      status: 'loading',
      data: null,
    };
  }

  return {
    status: 'success',
    data: data?.stream,
  };
};

export default useStream;
