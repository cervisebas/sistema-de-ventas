import { PrincipalView } from '@/components/PrincipalView';
import React from 'react';
import { Appbar } from 'react-native-paper';

export function ProductScreen() {
  return (
    <PrincipalView>
      <Appbar.Header>
        <Appbar.Content title={'Productos'} />
      </Appbar.Header>
    </PrincipalView>
  );
}
