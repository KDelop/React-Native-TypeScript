import * as React from 'react';
import AppleHealthKit, {
  HealthKitPermissions,
  HealthValue,
} from 'react-native-health';
import {startOfDay} from 'date-fns';

const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.AppleExerciseTime,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
    ],
  },
} as HealthKitPermissions;

type InitStates = 'initializing' | 'failure' | 'initialized';

const useHealthSummary = () => {
  const [maxHeartRate, setMaxHeartRate] = React.useState<number>();
  const [exerciseTime, setExerciseTime] = React.useState<number>();
  const [energyBurned, setEnergyBurned] = React.useState<number>();
  const [initState, setInitState] = React.useState<InitStates>('initializing');

  React.useEffect(() => {
    AppleHealthKit.initHealthKit(permissions, (error: string) => {
      if (error) {
        return setInitState('failure');
      }

      setInitState('initialized');

      const period = {
        startDate: startOfDay(new Date()).toISOString(),
        endDate: new Date().toISOString(),
      };

      AppleHealthKit.getActiveEnergyBurned(
        {
          ...period,
          unit: AppleHealthKit.Constants.Units.kilocalorie,
        },
        (e, result) => {
          if (result && result.length > 0) {
            setEnergyBurned(result.reduce((acc, x) => acc + x.value, 0));
          }
        },
      );

      AppleHealthKit.getAppleExerciseTime(
        {
          ...period,
          unit: AppleHealthKit.Constants.Units.minute,
        },
        (e, result) => {
          if (result && result.length > 0) {
            setExerciseTime(result.reduce((acc, x) => acc + x.value, 0));
          }
        },
      );

      AppleHealthKit.getHeartRateSamples(
        {
          ...period,
          unit: AppleHealthKit.Constants.Units.bpm,
        },
        (e, result: any) => {
          if (result && result.length > 0) {
            setMaxHeartRate(
              Math.max(...result.map((x: HealthValue) => x.value)),
            );
          }
        },
      );
    });
  }, []);

  return {state: initState, maxHeartRate, exerciseTime, energyBurned};
};

export default useHealthSummary;
