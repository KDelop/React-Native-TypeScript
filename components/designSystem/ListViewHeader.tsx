import * as React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {View, StyleSheet} from 'react-native';

import {LIGHT_GREY} from '../colors';
import RoundedInput, {IProps as IRoundedInputProps} from './RoundedInput';
import Typography from './Typography';
import ViewHeader from './ViewHeader';
import Padded from './Padded';

interface IProps {
  title?: React.ReactNode;
  showBackButton?: boolean;
  searchInputProps?: IRoundedInputProps;
  rightAdornment?: React.ReactNode;
}

const ListViewHeader: React.FunctionComponent<IProps> = ({
  title,
  searchInputProps,
  rightAdornment,
  showBackButton,
}) => {
  return (
    <ViewHeader showBackButton={showBackButton}>
      <Padded size={{bottom: 3}} style={styles.headingContainer}>
        {title && (
          <Typography variant="screenTitle" style={styles.headingText}>
            {title}
          </Typography>
        )}
        <View>{rightAdornment}</View>
      </Padded>
      <RoundedInput
        leftAdornment={
          <FeatherIcon name="search" size={18} color={LIGHT_GREY} />
        }
        {...searchInputProps}
      />
    </ViewHeader>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingText: {
    alignItems: 'center',
    flex: 1,
  },
});

export default ListViewHeader;
