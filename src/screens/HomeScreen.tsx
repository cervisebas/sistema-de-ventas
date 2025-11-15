import React from 'react';
import { PrincipalView } from '@/components/PrincipalView';
import { Appbar } from 'react-native-paper';

export function HomeScreen() {
  return (
    <PrincipalView>
      <Appbar.Header>
        <Appbar.Content title={'Estadisticas'} />
      </Appbar.Header>
    </PrincipalView>
  );
}
