import * as React from 'react';
import { AppState, AppStateStatus } from 'react-native';

export default function useAppState(): [
  AppStateStatus,
  AppStateStatus | undefined
] {
  const [prevAppState, setPrevAppState] = React.useState<AppStateStatus>();
  const [appState, setAppState] = React.useState(AppState.currentState);

  React.useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      setPrevAppState(appState);
      setAppState(nextAppState);
    };

    AppState.addEventListener('change', handleAppStateChange);
    return () => AppState.removeEventListener('change', handleAppStateChange);
  }, []);

  return [appState, prevAppState];
}
