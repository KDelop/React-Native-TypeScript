import * as React from 'react';
import {StyleSheet} from 'react-native';

import Padded from './designSystem/Padded';
import useHealthSummary from '../hooks/useHealthSummary';
import HealthStatItem from './designSystem/HealthStatItem';
import Typography from './designSystem/Typography';
import Card from './designSystem/Card';
import {LIGHT_BRAND_RED} from './colors';
import Divider from './designSystem/Divider';
import ListPlaceholder from './designSystem/ListPlaceholder';

const DashboardHealthStats = () => {
  const {state, maxHeartRate, exerciseTime, energyBurned} = useHealthSummary();

  return (
    <Padded size={{left: 5, right: 5, top: 8}}>
      <Padded size={{bottom: 4}}>
        <Typography variant="dashboardSubHeading">HEALTH STATS</Typography>
      </Padded>
      <Card disableDropShadow borderRadiusSize="small">
        {state === 'initialized' && (
          <Padded
            size={{left: 4, right: 4, top: 3, bottom: 3}}
            style={styles.card}>
            <HealthStatItem
              label="Peak Heart Rate"
              units="bpm"
              value={maxHeartRate}
            />
            <Divider vertical />
            <HealthStatItem
              label="Activity Time"
              units="mins"
              value={exerciseTime}
            />
            <Divider vertical />
            <HealthStatItem
              label="Energy Burned"
              units="cal"
              value={energyBurned}
              valueColor={LIGHT_BRAND_RED}
            />
          </Padded>
        )}
        {state === 'initializing' && <ListPlaceholder.Loading />}
      </Card>
    </Padded>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default DashboardHealthStats;
