import { PrincipalView } from '@/components/PrincipalView';
import React from 'react';
import { Appbar } from 'react-native-paper';

export function SaleScreen() {
  return (
    <PrincipalView>
      <Appbar.Header>
        <Appbar.Content title={'Ventas'} />
      </Appbar.Header>
    </PrincipalView>
  );
}
