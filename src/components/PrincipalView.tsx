import React, { useMemo } from 'react';
import {
  Keyboard,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from 'react-native-paper';

interface IProps {
  style?: StyleProp<ViewStyle>;
  className?: string;
  hideKeyboard?: boolean;
  children?: React.ReactNode;
}

export function PrincipalView(props: IProps) {
  const theme = useTheme();

  const children = useMemo(
    () =>
      props.hideKeyboard ? (
        <TouchableWithoutFeedback
          style={styles.full}
          onPress={Keyboard.dismiss}
          // eslint-disable-next-line react/no-children-prop
          children={
            <View
              className={props.className}
              style={[styles.full, props.style]}
              // eslint-disable-next-line react/no-children-prop
              children={props.children}
            />
          }
        />
      ) : (
        props.children
      ),
    [props],
  );

  return (
    <View
      className={props.hideKeyboard ? undefined : props.className}
      style={[
        styles.full,
        {
          backgroundColor: theme.colors.surface,
        },
        props.hideKeyboard ? undefined : props.style,
      ]}
      // eslint-disable-next-line react/no-children-prop
      children={children}
    />
  );
}

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
});
