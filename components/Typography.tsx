import * as React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';

import { BRAND_BLUE } from '../constants/colors';

interface IProps extends TextProps {
  variant?: 'h1' | 'caption' | 'info' | 'title' | 'title2' | 'body' | 'body2';
  gutterBottom?: boolean;
}

const Typography: React.SFC<IProps> = ({
  variant = 'h1',
  style,
  gutterBottom,
  ...props
}) => {
  const baseStyles = [style, gutterBottom && styles.gutterBottom];

  switch (variant) {
    case 'h1':
      return (
        <Text style={[styles.montserrat, styles.h1, baseStyles]} {...props} />
      );
    case 'caption':
      return (
        <Text
          style={[styles.montserrat, styles.caption, baseStyles]}
          {...props}
        />
      );
    case 'info':
      return (
        <Text style={[styles.roboto, styles.info, baseStyles]} {...props} />
      );
    case 'title':
      return (
        <Text
          style={[styles.montserrat, styles.title, baseStyles]}
          {...props}
        />
      );
    case 'title2':
      return (
        <Text
          style={[styles.montserrat, styles.title2, baseStyles]}
          {...props}
        />
      );
    case 'body':
      return (
        <Text style={[styles.montserrat, styles.body, baseStyles]} {...props} />
      );
    case 'body2':
      return (
        <Text
          style={[styles.montserrat, styles.body2, baseStyles]}
          {...props}
        />
      );
  }
};

const styles = StyleSheet.create({
  montserrat: {
    fontFamily: 'Montserrat'
  },
  roboto: {
    fontFamily: 'Roboto'
  },
  body: {
    fontSize: 20
  },
  body2: {
    fontSize: 16
  },
  h1: {
    fontSize: 36,
    fontWeight: '800',
    fontStyle: 'italic',
    color: '#FFF'
  },
  caption: {
    fontSize: 18,
    color: '#FFF'
  },
  info: {
    fontSize: 14,
    color: '#FFF',
    letterSpacing: 3
  },
  title: {
    fontSize: 16,
    color: BRAND_BLUE,
    fontWeight: '500',
    textTransform: 'uppercase'
  },
  title2: {
    fontSize: 16,
    color: BRAND_BLUE
  },
  gutterBottom: {
    marginBottom: 8
  }
});

export default Typography;
