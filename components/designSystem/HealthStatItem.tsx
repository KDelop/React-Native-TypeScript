import * as React from 'react';
import {StyleSheet} from 'react-native';
import {BRAND_BLUE} from '../colors';

import Padded from './Padded';
import Typography from './Typography';

interface IProps {
  label: string;
  value?: number;
  units: string;
  valueColor?: string;
}

const HealthStatItem: React.FunctionComponent<IProps> = ({
  label,
  value,
  units,
  valueColor = BRAND_BLUE,
}) => {
  return (
    <Padded>
      <Typography variant="healthStatLabel">{label}</Typography>
      <Padded size={{top: 2}} style={styles.valueContainer}>
        <Typography variant="healthStatValue" color={valueColor}>
          {value !== undefined ? value?.toFixed?.(0) : '— '}
        </Typography>
        <Typography variant="healthStatUnits" style={{paddingBottom: 1}}>
          {units}
        </Typography>
      </Padded>
    </Padded>
  );
};

const styles = StyleSheet.create({
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});

export default HealthStatItem;
