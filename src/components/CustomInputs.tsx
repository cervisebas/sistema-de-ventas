import { TextInput as TextInputNative } from 'react-native-paper';
import React, { forwardRef } from 'react';
import { TextInput as NativeTextInput } from 'react-native';
import { CustomTextInputProps } from '@/interfaces/CustomInputs';
import { TextInputRef } from '@/interfaces/TextInputRef';

export const CustomTextInputNative = forwardRef(
  (_props: CustomTextInputProps, ref: React.Ref<TextInputRef>) => {
    const props = {
      ..._props,
      value: _props.value ? String(_props.value) : _props.value,
    };
    if (props.onlyNativeTextInput) {
      return <NativeTextInput {...(props as any)} />;
    }
    return <TextInputNative {...props} ref={ref as any} />;
  },
);

export const FormatTextInputBase = forwardRef(function (
  props: CustomTextInputProps & {
    format: (val: string) => string;
  },
  ref: React.Ref<TextInputRef>,
) {
  return (
    <CustomTextInputNative
      {...props}
      ref={ref as any}
      onChangeText={(val) => {
        props.onChangeText?.(props.format(val));
      }}
    />
  );
});
