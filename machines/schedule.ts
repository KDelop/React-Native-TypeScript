import {gql} from '@apollo/client';
import {
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import {createMachine, assign} from 'xstate';

import {client} from '../apollo/config';
import {IScheduleItem} from '../types';

interface IContext {
  schedule: Record<string, Array<IScheduleItem>>;
  date: Date;
}

export const createScheduleKey = (date: Date) => format(date, 'MM-yyyy');

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

interface IVariables {
  startDate: string;
  endDate: string;
}

const fetchSchedule = async (variables: IVariables) => {
  const result = await client.query({
    query: SCHEDULE_QUERY,
    variables,
    fetchPolicy: 'network-only',
  });

  return result?.data?.schedule?.nodes;
};

const scheduleMachine = createMachine<IContext>(
  {
    id: 'schedule',
    context: {
      date: new Date(),
      schedule: {},
    },
    initial: 'fetchingSchedule',
    states: {
      fetchingSchedule: {
        invoke: {
          src: 'fetchSchedule',
          onDone: {
            target: 'waiting',
            actions: 'addScheduleItems',
          },
          onError: {
            target: 'failure',
          },
        },
      },
      waiting: {
        on: {
          MONTH_CHANGED: {
            target: 'fetchingSchedule',
          },
        },
      },
      failure: {
        // do something at some point ...
      },
    },
  },
  {
    actions: {
      addScheduleItems: assign((ctx, event) => ({
        date: event.data.date,
        schedule: {...ctx.schedule, [event.data.key]: event.data.schedule},
      })),
    },
    services: {
      fetchSchedule: async (ctx, event) => {
        const date = event.date || ctx.date;
        const startDate = startOfWeek(startOfMonth(date)).toISOString();
        const endDate = endOfWeek(endOfMonth(date)).toISOString();

        return {
          date,
          key: createScheduleKey(date),
          schedule: await fetchSchedule({startDate, endDate}),
        };
      },
    },
    guards: {},
  },
);

export default scheduleMachine;
