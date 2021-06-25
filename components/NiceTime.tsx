import * as Rx from 'rxjs';
import * as React from 'react';

interface IProps {
  timestamp: number;
}

const secondsPastNiceValue = (secondsPast: number) => {
  if (secondsPast > 24 * 7 * 24 * 3600) {
    return `${Math.floor(secondsPast / (12 * 7 * 24 * 3600))} months ago`;
  }

  if (secondsPast > 12 * 7 * 24 * 3600) {
    return `A year ago`;
  }

  if (secondsPast > 8 * 7 * 24 * 3600) {
    return `${Math.floor(secondsPast / (4 * 7 * 24 * 3600))} months ago`;
  }

  if (secondsPast > 4 * 7 * 24 * 3600) {
    return 'A month ago';
  }

  if (secondsPast > 2 * 7 * 24 * 3600) {
    return `${Math.floor(secondsPast / (7 * 24 * 3600))} weeks ago`;
  }

  if (secondsPast > 2 * 7 * 24 * 3600) {
    return 'A few weeks ago';
  }

  if (secondsPast > 7 * 24 * 3600) {
    return 'A week ago';
  }

  if (secondsPast > 2 * 24 * 3600) {
    return 'A few days ago';
  }

  if (secondsPast > 24 * 3600) {
    return 'Yesterday';
  }

  if (secondsPast > 3600) {
    return 'A few hour(s) ago';
  }

  if (secondsPast > 1800) {
    return 'Half an hour ago';
  }

  if (secondsPast > 60) {
    return `${Math.floor(secondsPast / 60)} minute(s) ago`;
  }

  return `${Math.max(0, Math.floor(secondsPast))} second(s) ago`;
};

const NiceTime: React.SFC<IProps> = ({ timestamp }) => {
  const [currentTimeS, setCurrentTimeS] = React.useState(Date.now());
  const secondsPast = (currentTimeS - timestamp) / 1000;

  React.useEffect(() => {
    const subscription = Rx.interval(500).subscribe(() =>
      setCurrentTimeS(Date.now())
    );
    return () => subscription.unsubscribe();
  }, []);

  return <React.Fragment>{secondsPastNiceValue(secondsPast)}</React.Fragment>;
};

export default NiceTime;
