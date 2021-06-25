import * as React from 'react';
import {View, StyleSheet} from 'react-native';

import Typography from './Typography';
import ViewHeader, {IProps as IViewHeaderProps} from './ViewHeader';
import Padded from './Padded';

interface IProps extends IViewHeaderProps {
  title?: React.ReactNode;
  rightAdornment?: React.ReactNode;
}

const TitledViewHeader: React.FunctionComponent<IProps> = ({
  title,
  rightAdornment,
  showBackButton,
  dropShadowStyle,
}) => {
  return (
    <ViewHeader
      dropShadowStyle={dropShadowStyle}
      showBackButton={showBackButton}>
      <Padded size={{bottom: 3}} style={styles.headingContainer}>
        {title && (
          <Typography variant="screenTitle" style={styles.headingText}>
            {title}
          </Typography>
        )}
        <View>{rightAdornment}</View>
      </Padded>
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

export default TitledViewHeader;
