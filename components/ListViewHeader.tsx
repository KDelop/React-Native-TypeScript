import * as React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

import { BRAND_BLUE, LIGHT_GREY } from '../constants/colors';
import RoundedInput, { IProps as IRoundedInputProps } from './RoundedInput';

interface IProps {
  title?: React.ReactNode;
  showBackButton?: boolean;
  searchInputProps?: IRoundedInputProps;
  rightAdornment?: React.ReactNode;
}

const ListViewHeader: React.SFC<IProps> = ({
  title,
  showBackButton = true,
  searchInputProps,
  rightAdornment
}) => {
  const { goBack } = useNavigation();

  const handleBackOnPress = React.useCallback(() => goBack(), [goBack]);

  return (
    <View style={styles.root}>
      <View style={styles.headingControls}>
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackOnPress}
          >
            <FeatherIcon
              name="chevron-left"
              color={BRAND_BLUE}
              size={22}
              style={styles.backButtonIcon}
            />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.headingContainer}>
        {title && <Text style={styles.heading}>{title}</Text>}
        <View>{rightAdornment}</View>
      </View>
      <RoundedInput
        leftAdornment={
          <FeatherIcon name="search" size={18} color={LIGHT_GREY} />
        }
        {...searchInputProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingLeft: '5%',
    paddingRight: '5%',
    marginTop: 10,
    marginBottom: 10
  },
  backButton: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  backButtonText: {
    color: BRAND_BLUE
  },
  backButtonIcon: {
    marginLeft: -5
  },
  headingControls: {
    marginBottom: 10
  },
  headingContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  heading: {
    fontFamily: 'Montserrat',
    fontSize: 34,
    fontWeight: '800',
    color: BRAND_BLUE,
    fontStyle: 'italic',
    textTransform: 'uppercase',
    alignItems: 'center',
    flex: 1
  }
});

export default ListViewHeader;
