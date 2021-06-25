import * as React from 'react';
import {Platform, ScrollView, StyleSheet, TextInput, View} from 'react-native';

import {LIGHT_BRAND_RED} from './colors';
import AppContainer from './designSystem/AppContainer';
import Card from './designSystem/Card';
import GradientButton from './designSystem/GradientButton';
import Padded from './designSystem/Padded';
import Typography from './designSystem/Typography';
import StreamCloseButton from './StreamCloseButton';

interface IProps {
  goLiveOnClick: (streamTitle: string, description: string) => void;
  onRequestClose(): void;
}

const getPlatform = () => (Platform.OS === 'android' ? 'android' : 'ios');

const NewStreamOverlay: React.FunctionComponent<IProps> = ({
  goLiveOnClick,
  onRequestClose,
}) => {
  const [streamTitle, setStreamTitle] = React.useState('');
  const [streamDescription, setStreamDescription] = React.useState('');

  return (
    <>
      <View style={styles.blurView}>
        <AppContainer
          style={{backgroundColor: 'transparent'}}
          statusBarStyle="light-content">
          <ScrollView scrollEnabled={false}>
            <Padded style={styles.header} size={{left: 5, right: 5, bottom: 6}}>
              <StreamCloseButton onPress={() => onRequestClose()} />
            </Padded>
            <Padded size={4}>
              <Card borderRadiusSize="small" style={styles.formContainer}>
                <Padded size={4}>
                  <Padded style={styles.formHeader} size={{left: 2, right: 2}}>
                    <Typography variant="streamTitleLabel">Title:</Typography>
                    <TextInput
                      multiline
                      placeholder="STREAM TITLE..."
                      maxLength={64}
                      placeholderTextColor="rgba(255, 255, 255, 0.7)"
                      style={styles.titleInput}
                      value={streamTitle}
                      onChangeText={(val) => setStreamTitle(val.toUpperCase())}
                    />
                  </Padded>
                  <Padded size={{top: 3, left: 3}}>
                    <TextInput
                      multiline
                      placeholder="Write something..."
                      maxLength={256}
                      placeholderTextColor="rgba(255, 255, 255, 0.7)"
                      style={styles.descriptionInput}
                      value={streamDescription}
                      onChangeText={(val) => setStreamDescription(val)}
                    />
                  </Padded>
                </Padded>
              </Card>
            </Padded>
            <Padded size={{left: 5, right: 5, top: 30}}>
              <GradientButton
                onPress={() => {
                  if (streamTitle !== '' && streamDescription !== '') {
                    goLiveOnClick(streamTitle, streamDescription);
                  }
                }}>
                GO LIVE
              </GradientButton>
            </Padded>
          </ScrollView>
        </AppContainer>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  blurView: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  formHeader: {
    borderLeftColor: LIGHT_BRAND_RED,
    borderLeftWidth: 3,
  },
  titleInput: {
    fontSize: 16,
    fontFamily: 'Montserrat-ExtraBoldItalic',
    color: 'white',
    textTransform: 'uppercase',
  },
  descriptionInput: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: 'white',
  },
});

export default NewStreamOverlay;
