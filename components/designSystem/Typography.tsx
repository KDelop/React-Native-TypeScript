import * as React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

import {
  BLUE_GREY,
  BLUE_GREY_CONTRAST,
  BRAND_BLUE,
  BRAND_RED,
  LIGHT_BRAND_BLUE,
  LIGHT_GREY,
  MEDIUM_GREY,
} from '../colors';

interface IProps {
  fontFamily?: 'Montserrat' | 'Roboto';
  variant?: keyof typeof styles;
  color?: string;
}

const Typography: React.FunctionComponent<TextProps & IProps> = ({
  style,
  fontFamily = 'Montserrat',
  variant,
  color,
  ...rest
}) => {
  return (
    <Text
      {...rest}
      style={[
        {fontFamily: `${fontFamily}-Regular`},
        variant && styles[variant],
        style,
        Boolean(color) && {color},
      ]}
    />
  );
};

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 36,
    // Font in android suck and need to be defined explicitly instead of using
    // fontWeight, etc.
    fontFamily: 'Montserrat-ExtraBoldItalic',
    color: BRAND_BLUE,
    textTransform: 'uppercase',
  },
  dashboardWelcome: {
    fontSize: 26,
    fontFamily: 'Montserrat-ExtraBoldItalic',
    color: BRAND_BLUE,
    textTransform: 'uppercase',
  },
  connectModalTitle: {
    fontSize: 24,
    fontFamily: 'Montserrat-ExtraBoldItalic',
    color: 'white',
    textTransform: 'uppercase',
  },
  roundActionButtonLabel: {
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    color: 'white',
  },
  onboardingTitle: {
    fontSize: 34,
    fontFamily: 'Montserrat-ExtraBoldItalic',
    color: 'white',
    textTransform: 'uppercase',
  },
  onboardingFooter: {
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    color: 'white',
  },
  onboardingFooterLink: {
    fontSize: 13,
    fontFamily: 'Montserrat-Bold',
    color: 'white',
  },
  gradientButtonText: {
    fontSize: 16,
    fontFamily: 'Montserrat-BoldItalic',
    color: 'white',
    textTransform: 'uppercase',
  },
  profilePictureLabel: {
    fontSize: 16,
    fontFamily: 'Montserrat-ExtraBoldItalic',
    color: BRAND_BLUE,
    textTransform: 'uppercase',
  },
  profilePictureLocationLabel: {
    fontSize: 14,
    color: MEDIUM_GREY,
    fontFamily: 'Montserrat-Regular',
  },
  profilePictureSubLabel: {
    fontSize: 12,
    color: LIGHT_GREY,
    fontFamily: 'Montserrat-Medium',
  },
  listItemPrimary: {
    fontSize: 16,
    color: '#414d55',
    fontFamily: 'Montserrat-Bold',
  },
  listItemSecondary: {
    fontSize: 14,
    color: '#414d55',
    fontFamily: 'Montserrat-Medium',
  },
  listItemTertiary: {
    fontSize: 12,
    color: MEDIUM_GREY,
    fontFamily: 'Montserrat-Regular',
  },
  streamTitleLabel: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'Montserrat-Regular',
  },
  streamChatItemTitle: {
    fontSize: 12,
    color: LIGHT_GREY,
    fontFamily: 'Montserrat-Regular',
  },
  streamChatItemHostTitle: {
    fontSize: 12,
    color: '#80a6dd',
    fontFamily: 'Montserrat-Regular',
  },
  streamChatItemBody: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Montserrat-Regular',
  },
  settingsItemPrimary: {
    fontSize: 13,
    color: MEDIUM_GREY,
    fontFamily: 'Montserrat-Regular',
  },
  settingsViewHeading: {
    fontSize: 24,
    fontFamily: 'Montserrat-ExtraBold',
    color: BRAND_BLUE,
    textTransform: 'uppercase',
  },
  settingsLogoutText: {
    color: BRAND_RED,
  },
  streamUserChipLabel: {
    fontSize: 14,
    fontFamily: 'Montserrat-ExtraBoldItalic',
    color: 'white',
    textTransform: 'uppercase',
  },
  streamUserChipSubLabel: {
    fontSize: 10,
    fontFamily: 'Montserrat-ExtraBoldItalic',
    color: 'white',
    textTransform: 'uppercase',
  },
  scheduleItemTertiary: {
    fontSize: 10,
    color: LIGHT_GREY,
    fontFamily: 'Montserrat-Medium',
  },
  scheduleItemDescription: {
    fontSize: 13,
    color: LIGHT_GREY,
    fontFamily: 'Montserrat-Regular',
  },
  scheduleItemTitle: {
    fontSize: 14,
    color: '#414d55',
    fontFamily: 'Montserrat-Bold',
  },
  datePickerValueLabel: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: MEDIUM_GREY,
  },
  greyLabel: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: MEDIUM_GREY,
  },
  radioFieldLabel: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: MEDIUM_GREY,
  },
  waitingForHostText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: MEDIUM_GREY,
  },
  listPlaceholderText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    color: MEDIUM_GREY,
  },
  toastTitle: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    color: BRAND_BLUE,
  },
  toastDescription: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: MEDIUM_GREY,
  },
  streamViewCountText: {
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    color: 'white',
  },
  calendarHeaderText: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontFamily: 'Montserrat-BoldItalic',
    color: BRAND_BLUE,
  },
  calendarDateSelected: {
    fontSize: 14,
    fontFamily: 'Montserrat-BoldItalic',
    color: 'white',
  },
  calendarDate: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: BRAND_BLUE,
  },
  calendarDateOutsideOfMonth: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: LIGHT_GREY,
  },
  calendarDotw: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: LIGHT_GREY,
  },
  facepilePlusText: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: 'white',
  },
  gradientBadgeText: {
    fontSize: 10,
    fontFamily: 'Montserrat-Bold',
    color: 'white',
  },
  dashboardHeaderDate: {
    fontSize: 13,
    fontFamily: 'Montserrat-Italic',
    color: LIGHT_GREY,
  },
  dashboardScheduleItemTime: {
    fontSize: 13,
    fontFamily: 'Montserrat-ExtraBold',
    color: 'white',
    textAlign: 'center',
  },
  dashboardScheduleItemPeriod: {
    fontSize: 13,
    textAlign: 'center',
    textTransform: 'lowercase',
    fontFamily: 'Montserrat-Regular',
    color: 'white',
  },
  dashboardSubHeading: {
    fontSize: 18,
    fontFamily: 'Montserrat-ExtraBoldItalic',
    color: BLUE_GREY_CONTRAST,
  },
  healthStatLabel: {
    fontSize: 10,
    fontFamily: 'Montserrat-MediumItalic',
    color: LIGHT_GREY,
  },
  healthStatValue: {
    fontSize: 20,
    fontFamily: 'Montserrat-ExtraBoldItalic',
    color: BRAND_BLUE,
  },
  healthStatUnits: {
    fontSize: 14,
    fontFamily: 'Montserrat-Light',
    color: BLUE_GREY_CONTRAST,
  },
  streamChatHeaderPrimary: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontFamily: 'Montserrat-SemiBold',
    color: 'white',
  },
  streamChatHeaderSecondary: {
    fontSize: 14,
    fontFamily: 'Montserrat-Italic',
    color: BLUE_GREY,
  },
  roundToastPrimary: {
    fontSize: 12,
    fontFamily: 'Montserrat-BoldItalic',
    color: 'white',
  },
  roundToastSecondary: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: 'white',
  },
});

export default Typography;
