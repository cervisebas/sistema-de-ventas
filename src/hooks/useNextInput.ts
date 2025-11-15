import { useRef } from 'react';
import { TextInputProps as TextInputNativeProps } from 'react-native';
import { TextInputRef } from '../interfaces/TextInputRef';

export default function <T = string>() {
  const refs = useRef<Record<string, TextInputRef>>({});

  return {
    toNext(key: T, to?: T | (() => void)) {
      return {
        ref(ref: TextInputRef) {
          refs.current[key as string] = ref;
        },
        returnKeyType: !to
          ? undefined
          : typeof to !== 'string'
            ? 'send'
            : 'next',
        //blurOnSubmit: typeof to !== 'string',
        submitBehavior: typeof to === 'string' ? 'submit' : undefined,
        onSubmitEditing() {
          if (!to) {
            return;
          }

          if (typeof to === 'string') {
            refs.current[to]?.focus();
          } else {
            (to as () => void)();
          }
        },
      } as TextInputNativeProps as {
        returnKeyType: TextInputNativeProps['returnKeyType'];
        blurOnSubmit: TextInputNativeProps['blurOnSubmit'];
        onSubmitEditing: TextInputNativeProps['onSubmitEditing'];
      };
    },
  };
}
