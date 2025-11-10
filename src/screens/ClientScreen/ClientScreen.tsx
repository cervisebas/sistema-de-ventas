import { PrincipalView } from '@/components/PrincipalView';
import SafeArea from '@/components/SafeArea';
import { refNavigation } from '@/constants/Refs';
import { StackScreenName } from '@/enums/StackScreenName';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

export function ClientScreen() {
  return (
    <PrincipalView>
      <Appbar.Header>
        <Appbar.Content title={'Clientes'} />
      </Appbar.Header>

      <SafeArea.FAB
        icon={'plus'}
        style={styles.fab}
        expandArea={{
          bottom: 16,
          right: 16,
        }}
        onPress={() => {
          refNavigation.current?.navigate(StackScreenName.CLIENT_MANAGER);
        }}
      />
    </PrincipalView>
  );
}

const styles = StyleSheet.create({
  fab: {
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
});
