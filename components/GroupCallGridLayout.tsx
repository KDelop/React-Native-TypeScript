import * as React from 'react';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';

import GridLayout from './GridView';
import {IPeers, Peer} from '../hooks/useGroupCallRTC';
import AgnositcRtcRemoteView from './AgnosticRtcRemoteView';
import AgnositcRtcLocalView from './AgnosticRtcLocalView';
import {VideoRenderMode} from 'react-native-agora';

interface IProps {
  localCameraIsOff: boolean;
  localMicIsOff: boolean;
  channelId: string;
  peers: IPeers;
}

type GridItem =
  | (Peer & {type: 'remote'})
  | {
      type: 'local';
      micIsOff: boolean;
      cameraIsOff: boolean;
    };

const getPlatform = () => (Platform.OS === 'android' ? 'android' : 'ios');

const GroupCallGridLayout: React.FunctionComponent<IProps> = ({
  peers,
  channelId,
  localCameraIsOff,
  localMicIsOff,
}) => {
  const gridData: Array<GridItem> = [
    {type: 'local', micIsOff: localMicIsOff, cameraIsOff: localCameraIsOff},
    ...Object.entries(peers).map(([key, x]: [string, Peer]) => ({
      type: 'remote' as const,
      ...x,
      uid: parseInt(key),
    })),
  ];

  return (
    <View style={styles.root}>
      <GridLayout
        data={gridData}
        renderItem={(x, i, arr) => (
          <View style={styles.gridItemOuter}>
            <View
              style={[
                styles.gridItemInner,
                {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  maxWidth:
                    arr.length > 2
                      ? Dimensions.get('screen').width / 2
                      : 'auto',
                },
              ]}>
              {x.type === 'remote' ? (
                <AgnositcRtcRemoteView
                  platform={getPlatform()}
                  style={{flex: 1}}
                  uid={Number(x.uid)}
                  renderMode={VideoRenderMode.Hidden}
                  cameraIsOff={x?.cameraIsOff ?? false}
                  micIsOff={x?.micIsOff ?? false}
                />
              ) : (
                <AgnositcRtcLocalView
                  platform={getPlatform()}
                  style={{flex: 1}}
                  channelId={channelId}
                  renderMode={VideoRenderMode.Hidden}
                  cameraIsOff={localCameraIsOff}
                />
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 4,
    paddingRight: 4,
  },
  gridItemOuter: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  gridItemInner: {
    overflow: 'hidden',
    flex: 1,
    borderRadius: 6,
    marginBottom: 4,
    marginLeft: 4,
  },
});

export default GroupCallGridLayout;
