import * as React from 'react';
import {Linking, StyleSheet, View} from 'react-native';

import Padded from './designSystem/Padded';
import Typography from './designSystem/Typography';
import Card from './designSystem/Card';
import SettingsListItem from './SettingsListItem';
import Toast from 'react-native-toast-message';

const DashboardMore = () => {
  const openFeedbackForm = () =>
    Linking.openURL(
      'https://docs.google.com/forms/d/e/1FAIpQLSfMjygv8Ks0V_-Imq-e_z3aPlcRICx12ffzDbZVb5cF9Cnrcw/viewform',
    );

  return (
    <Padded size={{left: 5, right: 5, top: 8}}>
      <Padded size={{bottom: 4}}>
        <Typography variant="dashboardSubHeading">MORE</Typography>
      </Padded>
      <Card disableDropShadow borderRadiusSize="small">
        <View style={styles.card}>
          {process.env?.NODE_ENV === 'development' && (
            <>
              <SettingsListItem
                text="Mock Toast"
                icon={null}
                onPress={() =>
                  Toast.show({
                    type: 'message',
                    text1: 'Melania Rosenberg',
                    text2: 'Hello, how are you?',
                    props: {
                      userId: 'testid',
                    },
                  })
                }
              />
            </>
          )}
          <SettingsListItem
            text="Feedback"
            icon={null}
            onPress={openFeedbackForm}
          />
          <SettingsListItem
            text="Report a Bug"
            icon={null}
            onPress={openFeedbackForm}
            hideBorder
          />
        </View>
      </Card>
    </Padded>
  );
};

const styles = StyleSheet.create({
  card: {},
});

export default DashboardMore;
