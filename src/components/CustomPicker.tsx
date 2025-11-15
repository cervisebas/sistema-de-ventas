import useSafeArea from '@/hooks/useSafeArea';
import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import {
  Keyboard,
  NativeSyntheticEvent,
  StyleProp,
  TargetedEvent,
  ViewStyle,
} from 'react-native';
import { TouchableRipple, TouchableRippleProps } from 'react-native-paper';
import { Dropdown, DropdownRef } from 'react-native-paper-dropdown';

export interface PickerOption {
  label?: string;
  value: any;
}

export interface CustomPickerProps {
  label: string;
  value?: any;
  options: PickerOption[];
  error?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onChange?(value: any): void;
  onChangeText?(value: any): void;
  onChangeValue?(label: string | undefined, value: any): void;
  onBlur?(event: NativeSyntheticEvent<TargetedEvent>): void;
}

export interface CustomPickerRef {
  blur(): void;
  focus(): void;
}

export default React.memo(
  forwardRef(function (
    props: CustomPickerProps,
    ref: React.Ref<CustomPickerRef>,
  ) {
    const { top } = useSafeArea(undefined, 12);
    const refDropdown = useRef<DropdownRef>(null);

    function _onChange(_value: any) {
      if (props.disabled) {
        return;
      }
      const _find = props.options.find(({ value }) => value === _value);
      if (!_find || props.value === _find.value) {
        return;
      }
      props.onChange?.(_find.value);
      props.onChangeText?.(_find.value);
      props.onChangeValue?.(_find.label, _find.value);
    }

    useImperativeHandle(ref, () => ({
      focus() {
        Keyboard.dismiss();
        refDropdown.current?.focus();
      },
      blur() {
        Keyboard.dismiss();
        refDropdown.current?.blur();
      },
    }));

    const OPTIONS = useMemo(
      () =>
        props.options.map((val) => ({
          label: val.label ?? val.value,
          value: val.value,
        })),
      [props.options],
    );
    return (
      <Dropdown
        ref={refDropdown}
        label={props.label}
        error={props.error}
        disabled={props.disabled}
        options={OPTIONS}
        value={props.value}
        onSelect={_onChange}
        hideMenuHeader={true}
        statusBarHeight={top}
        mode={'outlined'}
        menuContentStyle={props.style as any}
        Touchable={Touchable as any}
      />
    );
  }),
);

const Touchable = React.memo(function (props: TouchableRippleProps) {
  return <TouchableRipple {...props} rippleColor={'transparent'} />;
});
