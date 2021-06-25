import * as React from 'react';
import {Subject, timer} from 'rxjs';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Animated,
} from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import {switchMap, tap} from 'rxjs/operators';
import Svg, {Path} from 'react-native-svg';

import BlurView from './designSystem/BlurView';
import Padded from './designSystem/Padded';

interface IProps {
  center: React.ReactNode;
  left: React.ReactNode;
  right: React.ReactNode;
  shouldAutoHide?: boolean;
}

const GroupCallControls: React.FunctionComponent<IProps> = ({
  center,
  left,
  right,
  shouldAutoHide,
}) => {
  const autoHideSubject = React.useRef(new Subject()).current;
  const opacity = React.useRef(new Animated.Value(1)).current;
  const fadeInAnimator = React.useRef(
    Animated.timing(opacity, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }),
  ).current;
  const fadeOutAnimator = React.useRef(
    Animated.timing(opacity, {
      toValue: 0.2,
      duration: 100,
      useNativeDriver: false,
    }),
  ).current;

  React.useEffect(() => {
    const fadeOutSub = autoHideSubject
      .pipe(
        tap(() => {
          fadeOutAnimator.stop();
          fadeInAnimator.start();
        }),
        switchMap(() => timer(3000)),
      )
      .subscribe(() => {
        fadeOutAnimator.start();
      });

    return () => {
      fadeOutSub.unsubscribe();
    };
  }, []);

  return (
    <TouchableWithoutFeedback
      onPressIn={(e) => {
        console.log('click');
        autoHideSubject.next();
      }}>
      <Animated.View style={{opacity}} onStartShouldSetResponder={() => true}>
        <View style={styles.center}>{center}</View>
        <MaskedView
          maskElement={
            <View style={styles.maskElementRoot}>
              <View style={styles.maskElementEdge} />
              <View style={styles.maskElementCenter}>
                <Svg width="138px" height="80px" viewBox="0 0 138 80">
                  <Path
                    fill="black"
                    scale="1.4"
                    d="M49.1685853,27.184398 C52.4523251,27.1203748 55.7650861,26.6644206 58.3565075,25.842826 C64.1794349,23.9967018 70.3669707,18.7318283 74.8423827,10.474812 C79.3177948,2.21779578 82.5969954,0 93.1569883,0 C100.196984,0 102.497581,0 100.058782,0 L100.058782,65 L49.1744129,65 L-1.13686838e-13,65 L-1.13686838e-13,0 C20.9083878,0 -2.13938951,0 4.90060578,0 C15.4605987,0 18.7397993,2.21779578 23.2152113,10.474812 C27.6906234,18.7318283 33.8781592,23.9967018 39.7010866,25.842826 C42.292508,26.6644206 45.8305755,27.1203748 49.1685853,27.184398 Z"
                  />
                </Svg>
              </View>
              <View style={styles.maskElementEdge} />
            </View>
          }
          style={styles.mask}>
          <BlurView blurType="ultraThinMaterial" style={{flex: 1}}>
            <Padded
              size={{left: 5, right: 5, top: 3}}
              style={styles.actionsContainer}>
              <View style={styles.left}>{left}</View>
              <View style={styles.right}>{right}</View>
            </Padded>
          </BlurView>
        </MaskedView>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  center: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  maskElementRoot: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  maskElementEdge: {
    flex: 1,
    flexShrink: 0,
    flexGrow: 1,
    backgroundColor: 'black',
  },
  maskElementCenter: {flex: 1, alignItems: 'center'},
  mask: {height: 80, width: '100%'},
  actionsContainer: {flex: 1, flexDirection: 'row'},
  left: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingRight: 55,
  },
  right: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 55,
  },
});

export default GroupCallControls;
