import { CustomTextInputProps } from '@/interfaces/CustomInputs';
import { TextInputRef } from '@/interfaces/TextInputRef';
import React, { forwardRef } from 'react';
import { CustomTextInputNative } from './CustomInputs';
import CurrencyInputNative from 'react-native-currency-input';

export const CurrencyInput = forwardRef(function (
  props: CustomTextInputProps,
  ref: React.Ref<TextInputRef>,
) {
  const _onChangeText = (v: number) => props.onChangeText?.((v ?? 0) as any);
  function getProps() {
    const _props = { ...props };
    delete _props.value;
    //delete _props.disabled;
    delete _props.onChangeText;
    delete _props.onChange;
    return _props;
  }

  return (
    <CustomTextInputNative
      ref={ref as any}
      {...(getProps() as any)}
      label={props.label}
      mode={'outlined'}
      autoComplete={'off'}
      render={(p) => (
        <CurrencyInputNative
          {...(p as any)}
          value={props.value}
          editable={!props.disabled}
          prefix={'$ '}
          minValue={0}
          onChangeValue={_onChangeText}
        />
      )}
    />
  );
});
