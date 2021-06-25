import * as React from 'react';
import {gql, NetworkStatus, useLazyQuery} from '@apollo/client';

import {Data, IScheduleItem} from '../types';

const SCHEDULE_QUERY = gql`
  query Schedule($startDate: String, $endDate: String) {
    schedule(startDate: $startDate, endDate: $endDate) {
      nodes {
        id
        title
        description
        startAt
        type
        attendees {
          id
        }
        initiatedBy {
          id
          firstName
          lastName
          isPro
        }
      }
    }
  }
`;

interface IArgs {
  startDate: string;
  endDate: string;
}

const useSchedule = ({
  startDate,
  endDate,
}: IArgs): Data<Array<IScheduleItem>> => {
  const [query, {error, data, networkStatus}] = useLazyQuery(SCHEDULE_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  React.useEffect(() => {
    query({
      variables: {
        startDate,
        endDate,
      },
    });
  }, [startDate, endDate]);

  if (error) {
    return {
      status: 'error',
      data: error,
    };
  }

  if (networkStatus === NetworkStatus.loading || !data) {
    return {
      status: 'loading',
      data: null,
    };
  }

  return {
    status: 'success',
    data: data?.schedule?.nodes,
  };
};

export default useSchedule;
