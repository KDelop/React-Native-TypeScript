import * as React from 'react';
import { StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useAnimation } from 'react-native-animation-hooks';

import { IProps as ISlideUpModalProps } from './SlideUpModal';
import Card from './Card';

const SlideUpModalConsumer: React.SFC<ISlideUpModalProps> = ({
  open,
  onRequestClose,
  onAnimationEnd,
  cardProps,
  children
}) => {
  const backdropOpacity = useAnimation({
    type: 'spring',
    initialValue: 0,
    toValue: open ? 1 : 0
  });

  React.useEffect(() => {
    if (onAnimationEnd) {
      backdropOpacity.addListener(x => onAnimationEnd());
    }

    return () => backdropOpacity.removeAllListeners();
  }, []);

  return (
    <Animated.View
      pointerEvents={open ? 'auto' : 'none'}
      style={[styles.backdrop, { opacity: backdropOpacity }]}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={styles.fillRemainder}
        onPress={onRequestClose}
      />
      <Card style={styles.card} {...cardProps}>
        {children}
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: '40%',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fillRemainder: {
    flex: 1
  },
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    position: 'absolute',
    zIndex: 10,
    height: '100%',
    width: '100%',
    backgroundColor: `rgba(0, 0, 0, 0.2)`
  }
});

export default SlideUpModalConsumer;
