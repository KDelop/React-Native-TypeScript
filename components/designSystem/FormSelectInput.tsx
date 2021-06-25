import {BlurView} from '@react-native-community/blur';
import * as React from 'react';
import {StyleSheet} from 'react-native';
import PickerSelect, {PickerSelectProps} from 'react-native-picker-select';

interface IProps extends PickerSelectProps {
  placeholder: string;
  top?: boolean;
  bottom?: boolean;
  borderBottom?: boolean;
}

const FormSelectInput = React.forwardRef<PickerSelect, IProps>(
  ({placeholder, top, bottom, borderBottom, style, ...rest}, ref) => {
    return (
      <BlurView>
        <PickerSelect
          ref={ref}
          {...rest}
          placeholder={placeholder}
          textInputProps={
            {
              placeholderTextColor: 'rgba(255, 255, 255, 0.6)',
              placeholder: placeholder,
              style: [
                styles.input,
                borderBottom && styles.borderBottom,
                style,
                top && styles.topBorderRadius,
                bottom && styles.bottomBorderRadius,
              ],
            } as any
          }
        />
      </BlurView>
    );
  },
);

const styles = StyleSheet.create({
  topBorderRadius: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  bottomBorderRadius: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  input: {
    height: 55,
    width: '100%',
    backgroundColor: 'rgba(235, 236, 237, 0.2)',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Roboto',
    color: '#FFF',
  },
  borderBottom: {
    borderBottomColor: '#555D69',
    borderBottomWidth: 1,
  },
});

export default FormSelectInput;
