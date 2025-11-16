import React from 'react';
import { PrincipalView } from '@/components/PrincipalView';
import { Appbar, List, Text } from 'react-native-paper';
import { useCountStats } from './hooks/useCountStats';
import { View } from 'react-native';
import SafeArea from '@/components/SafeArea';

export function HomeScreen() {
  const { clients, products, sales } = useCountStats();

  return (
    <PrincipalView>
      <Appbar.Header>
        <Appbar.Content title={'Estadisticas'} />
      </Appbar.Header>

      <View className={'flex-1 overflow-hidden'}>
        <SafeArea.ScrollView expandDisableTop className={'flex-1'}>
          <List.Item
            left={(p) => <List.Icon {...p} icon={'sale-outline'} />}
            title={'Ventas'}
            right={(p) => (
              <Text {...p} variant={'titleMedium'}>
                {clients}
              </Text>
            )}
          />
          <SafeArea.Divider />
          <List.Item
            left={(p) => <List.Icon {...p} icon={'sale-outline'} />}
            title={'Productos'}
            right={(p) => (
              <Text {...p} variant={'titleMedium'}>
                {products}
              </Text>
            )}
          />
          <SafeArea.Divider />
          <List.Item
            left={(p) => <List.Icon {...p} icon={'sale-outline'} />}
            title={'Clientes'}
            right={(p) => (
              <Text {...p} variant={'titleMedium'}>
                {sales}
              </Text>
            )}
          />
        </SafeArea.ScrollView>
      </View>
    </PrincipalView>
  );
}
