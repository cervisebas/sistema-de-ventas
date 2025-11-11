import { BottomSheetOptionsInterface } from '@/components/BottomSheetOptions';
import FlatListDynamicItems from '@/components/FlatListDynamicItems';
import { LoadingErrorContent } from '@/components/LoadingErrorContent';
import { PrincipalView } from '@/components/PrincipalView';
import SafeArea from '@/components/SafeArea';
import { refDialog, refNavigation } from '@/constants/Refs';
import { ClientController } from '@/database/controllers/ClientController';
import { TableName } from '@/database/enums/TableName';
import { useLiveDatabase } from '@/database/hooks/useLiveDatabase';
import { Client } from '@/database/interfaces/entities/Client';
import { StackScreenName } from '@/enums/StackScreenName';
import React, { useCallback, useRef } from 'react';
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Appbar, List } from 'react-native-paper';

const ITEM_HEIGHT = 56;

export function ClientScreen() {
  const controller = useRef(new ClientController());
  const { data, loading, refresh, error, reloadData } = useLiveDatabase(
    TableName.CLIENTS,
    controller.current,
  );

  const toggleClientActions = useCallback((client: Client) => {
    const information: BottomSheetOptionsInterface[] = [];
    information.push({
      leftIcon: 'account',
      label: 'Nombre completo',
      description: client.name,
    });

    if (client.email) {
      information.push({
        leftIcon: 'email-outline',
        label: 'Correo electronico',
        description: client.email,
      });
    }

    if (client.phone) {
      information.push({
        leftIcon: 'account',
        label: 'Teléfono',
        description: client.phone,
      });
    }

    refDialog.current?.showBottomSheetOptions('Opciónes', {
      'Información de cliente': information,
      'Acciónes rapidas': [
        {
          leftIcon: 'pencil-outline',
          label: 'Editar cliente',
          onPress() {
            refNavigation.current?.navigate(
              StackScreenName.CLIENT_MANAGER,
              client,
            );
          },
        },
        {
          leftIcon: 'delete-outline',
          label: 'Eliminar cliente',
        },
      ],
    });
  }, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Client>) => {
      return (
        <List.Item
          left={(p) => <List.Icon {...p} icon={'account'} />}
          right={(p) => <List.Icon {...p} icon={'dots-vertical'} />}
          title={item.name}
          style={styles.items}
          onPress={() => toggleClientActions(item)}
        />
      );
    },
    [toggleClientActions],
  );

  return (
    <PrincipalView>
      <Appbar.Header>
        <Appbar.Content title={'Clientes'} />
      </Appbar.Header>

      <View className={'flex-1 overflow-hidden'}>
        <LoadingErrorContent loading={loading} error={error}>
          <FlatListDynamicItems
            data={data}
            renderItem={renderItem}
            loading={false}
            heightItems={ITEM_HEIGHT}
            refreshing={refresh}
            onRefresh={reloadData}
            expandDisableTop={true}
            useDivider={true}
            emptyIcon={'account-off-outline'}
            emptyMessage={'No hay clientes registrados'}
          />
        </LoadingErrorContent>
      </View>

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
  items: {
    height: ITEM_HEIGHT,
  },
});
