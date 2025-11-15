import { MenuAppbar, MenuAppbarOption } from '@/components/MenuAppbar';
import { PrincipalView } from '@/components/PrincipalView';
import { refNavigation } from '@/constants/Refs';
import { StackScreenName } from '@/enums/StackScreenName';
import React from 'react';
import { Appbar } from 'react-native-paper';

const MENU_OPTIONS: MenuAppbarOption[] = [
  {
    label: 'Categorias',
    icon: 'shape-outline',
    onPress() {
      refNavigation.current?.navigate(StackScreenName.CATEGORIES);
    },
  },
];

export function ProductScreen() {
  return (
    <PrincipalView>
      <Appbar.Header>
        <Appbar.Content title={'Productos'} />
        <MenuAppbar icon={'dots-vertical'} options={MENU_OPTIONS} />
      </Appbar.Header>
    </PrincipalView>
  );
}
