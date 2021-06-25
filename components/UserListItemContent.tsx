import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Placeholder, Fade, PlaceholderLine } from 'rn-placeholder';

interface IProps {
  loading: boolean;
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
}

const UserListItemContent: React.SFC<IProps> = ({
  primary,
  secondary,
  loading
}) => {
  return (
    <View style={styles.content}>
      {loading ? (
        <Placeholder Animation={Fade} style={styles.placeholder}>
          <PlaceholderLine />
          <PlaceholderLine width={20} />
        </Placeholder>
      ) : (
        <React.Fragment>
          {primary && <View style={styles.contentTop}>{primary}</View>}
          {secondary && <View style={styles.contentBottom}>{secondary}</View>}
        </React.Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10
  },
  content: {
    flex: 1,
    marginLeft: 20
  },
  contentTop: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contentBottom: {
    width: '100%',
    alignItems: 'baseline',
    flex: 1
  }
});

export default UserListItemContent;
