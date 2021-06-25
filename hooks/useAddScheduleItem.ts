import * as React from 'react';
import {gql, useMutation} from '@apollo/client';
import {Data, IGenericParticipant, IScheduleItem} from '../types';

const ADD_SCHEDULE_ITEM = gql`
  mutation AddScheduleItem($scheduleItem: ScheduleItemInput!) {
    addScheduleItem(scheduleItem: $scheduleItem) {
      id
    }
  }
`;

interface IVariables {
  title: string;
  description: string;
  type: 'STREAM' | 'GROUP_CALL';
  attendees: Array<IGenericParticipant>;
  startAt?: string;
}

const useAddScheduleItem = () => {
  const [mutate, {error, loading, data}] = useMutation(ADD_SCHEDULE_ITEM);

  const result: Data<Array<IScheduleItem>> = React.useMemo(() => {
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
      data: data?.addScheduleItem?.id,
    };
  }, [data, error, loading]);

  const add = (scheduleItem: IVariables) =>
    mutate({
      variables: {
        scheduleItem,
      },
    });

  return [add, result] as const;
};

export default useAddScheduleItem;
