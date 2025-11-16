import React, { forwardRef } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  FormState,
  UseControllerProps,
} from 'react-hook-form';
import { HelperText } from 'react-native-paper';

export interface BaseInput<T = any> {
  value?: T;
  error?: boolean;
  onBlur?: () => void;
  onChangeText?: (val: T) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export default function <J = {}>(Component: React.ComponentType<J>) {
  type IProps<T extends FieldValues> = J & {
    name: keyof T;
    control: Control<T, any>;
    formState: FormState<T>;
    rules?: UseControllerProps['rules'];
    errorMessage?: string;
  };
  function Comp<T extends FieldValues>(props: IProps<T>, ref: React.Ref<any>) {
    if (!('control' in props)) {
      return <Component ref={ref} {...(props as any)} />;
    }

    return (
      <React.Fragment>
        <Controller
          name={props.name as string}
          rules={props.rules}
          control={props.control as any}
          render={({ field: { value, onBlur, onChange } }) => (
            <Component
              ref={ref}
              {...props}
              value={value}
              error={Boolean(props.formState.errors[props.name])}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
        />
        {props.errorMessage && props.formState.errors[props.name] && (
          <HelperText
            type={'error'}
            visible={Boolean(props.formState.errors[props.name])}
            style={{
              paddingVertical: 0,
            }}
          >
            {props.errorMessage}
          </HelperText>
        )}
      </React.Fragment>
    );
  }

  return forwardRef(Comp as any) as <T extends FieldValues>(
    props: IProps<T>,
  ) => React.JSX.Element;
}
