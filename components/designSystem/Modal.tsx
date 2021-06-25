import * as React from 'react';
import {
  StyleSheet,
  Animated,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import {IProps as ICardProps} from './Card';
import Card from './Card';
import BlurView from './BlurView';

export interface IProps {
  children?: React.ReactNode;
  open: boolean;
  cardProps?: ICardProps;
  onRequestClose?: TouchableOpacityProps['onPress'];
  onAnimationUpdate?(): void;
}

const Modal: React.FunctionComponent<IProps> = (props) => {
  const cachedProps = React.useRef<IProps>();
  const backdropOpacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (open) {
      cachedProps.current = props;
    }
  }, [props.open]);

  const {open} = props;
  const {onRequestClose, onAnimationUpdate, cardProps, children} =
    props.open || !cachedProps.current ? props : cachedProps.current;

  React.useEffect(() => {
    backdropOpacity.addListener(({value}) => {
      // When the modal has finished fading out
      if (value === 0) {
        cachedProps.current = undefined;
      }
      if (onAnimationUpdate) onAnimationUpdate();
    });

    return () => backdropOpacity.removeAllListeners();
  }, [onAnimationUpdate]);

  React.useEffect(() => {
    Animated.timing(backdropOpacity, {
      duration: 200,
      toValue: open ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [open]);

  return (
    <Animated.View
      pointerEvents={open ? 'auto' : 'none'}
      style={[styles.backdrop, {opacity: backdropOpacity}]}>
      <BlurView
        style={styles.blur}
        blurType="dark"
        blurAmount={0.1}
        reducedTransparencyFallbackColor="black"
      />
      <TouchableOpacity
        delayPressIn={0}
        activeOpacity={1}
        style={styles.fillRemainder}
        onPress={onRequestClose}
      />
      <Card style={styles.card} {...cardProps} borderRadiusSize="large">
        {children}
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: '15%',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fillRemainder: {
    flex: 1,
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  backdrop: {
    flex: 1,
    elevation: 10,
    justifyContent: 'flex-end',
    position: 'absolute',
    zIndex: 20,
    height: '100%',
    width: '100%',
  },
});

export default Modal;
