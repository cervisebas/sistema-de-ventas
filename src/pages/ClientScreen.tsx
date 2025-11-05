import { PrincipalView } from '@/components/PrincipalView';
import React from 'react';
import { Appbar } from 'react-native-paper';

export function ClientScreen() {
  return (
    <PrincipalView>
      <Appbar.Header>
        <Appbar.Content title={'Clientes'} />
      </Appbar.Header>
    </PrincipalView>
  );
}
