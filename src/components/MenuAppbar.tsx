import useSafeArea from '@/hooks/useSafeArea';
import React, { useState } from 'react';
import { Appbar, Menu } from 'react-native-paper';

export interface MenuAppbarOption {
  label: string;
  icon?: string;
  onPress(): void;
}

interface IProps {
  icon: string;
  options: MenuAppbarOption[];
}

export const MenuAppbar = React.memo(function (props: IProps) {
  const { top } = useSafeArea();
  const [visible, setVisible] = useState(false);

  const open = () => setVisible(true);
  const close = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={close}
      statusBarHeight={top}
      anchor={<Appbar.Action icon={props.icon} onPress={open} />}
    >
      {props.options.map((value, index) => (
        <Menu.Item
          key={`opt-${index}`}
          onPress={() => {
            close();
            value.onPress();
          }}
          title={value.label}
          leadingIcon={value.icon}
        />
      ))}
    </Menu>
  );
});
