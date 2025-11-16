import FlatListDynamicItems from '@/components/FlatListDynamicItems';
import { LoadingErrorContent } from '@/components/LoadingErrorContent';
import { PrincipalView } from '@/components/PrincipalView';
import SafeArea from '@/components/SafeArea';
import { refDialog, refNavigation } from '@/constants/Refs';
import { TableName } from '@/database/enums/TableName';
import { useLiveDatabase } from '@/database/hooks/useLiveDatabase';
import { Sale } from '@/database/interfaces/entities/Sale';
import { StackScreenName } from '@/enums/StackScreenName';
import { parseToCurrency } from '@/utils/parseToCurrency';
import React, { useCallback, useRef } from 'react';
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Appbar, List } from 'react-native-paper';
import moment from 'moment';
import { SaleController } from '@/database/controllers/SaleController';
import { BottomSheetOptionsInterface } from '@/components/BottomSheetOptions';
import { toast } from 'sonner-native';
import { SaleItemController } from '@/database/controllers/SaleItemController';

const ITEM_HEIGHT = 56;

export function SaleScreen() {
  const saleController = useRef(new SaleController());
  const saleItemController = useRef(new SaleItemController());
  const { data, loading, refresh, error, reloadData } = useLiveDatabase(
    [TableName.SALES, TableName.SALE_ITEMS],
    saleController.current,
  );

  const deleteSale = useCallback((sale: Sale) => {
    refDialog.current?.showAlert({
      message: `¿Estas seguro de eliminar la "Venta - ${moment(sale.date).format('DD-MM-YYYY HH:mm')} (#${sale.id})"?`,
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Eliminar',
          async onPress() {
            try {
              refDialog.current?.showLoading('Eliminando venta...');

              await Promise.all([
                ...sale.items.map((value) =>
                  saleItemController.current.delete(value.id!),
                ),
                saleController.current.delete(sale.id!),
              ]);

              toast.success('Se elimino el venta correctamente');
            } catch (error) {
              console.error(error);
              toast.error('Ocurrio un error al eliminar el venta');
            } finally {
              refDialog.current?.showLoading(false);
            }
          },
        },
      ],
    });
  }, []);

  const toggleSaleActions = useCallback(
    (sale: Sale) => {
      const options: Record<string, BottomSheetOptionsInterface[]> = {};

      const information: BottomSheetOptionsInterface[] = [];
      information.push({
        leftIcon: 'pound',
        label: 'Numero de venta',
        description: `#${sale.id}`,
      });
      information.push({
        leftIcon: 'calendar-clock',
        label: 'Fecha y hora',
        description: moment(sale.date).format('DD-MM-YYYY HH:mm'),
      });

      information.push({
        leftIcon: 'currency-usd',
        label: 'Precio',
        description: parseToCurrency(sale.price),
      });
      information.push({
        leftIcon: 'sale-outline',
        label: 'Descuento',
        description: `${sale.discount}%`,
      });

      if (sale.client) {
        information.push({
          leftIcon: 'account',
          label: 'Cliente',
          description: sale.client.name,
        });
      }

      Object.assign(options, { 'Información de venta': information });

      if (sale.items?.length) {
        Object.assign(options, {
          'Lista de productos': sale.items.map((value) => ({
            leftIcon: 'cart-outline',
            label: value.product.name,
            description: `${parseToCurrency(value.product.price / value.quantity)} x ${value.quantity} (${parseToCurrency(value.price)})`,
          })),
        });
      }

      refDialog.current?.showBottomSheetOptions('Opciónes', {
        ...options,
        'Acciónes rapidas': [
          {
            leftIcon: 'pencil-outline',
            label: 'Editar venta',
            onPress() {
              refNavigation.current?.navigate(
                StackScreenName.SALE_MANAGER,
                sale,
              );
            },
          },
          {
            leftIcon: 'delete-outline',
            label: 'Eliminar venta',
            onPress() {
              deleteSale(sale);
            },
          },
        ],
      });
    },
    [deleteSale],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Sale>) => {
      return (
        <List.Item
          left={(p) => <List.Icon {...p} icon={'cart-outline'} />}
          right={(p) => <List.Icon {...p} icon={'dots-vertical'} />}
          title={`Venta - ${moment(item.date).format('DD-MM-YYYY')} (#${item.id})`}
          description={parseToCurrency(item.price)}
          style={styles.items}
          onPress={() => toggleSaleActions(item)}
        />
      );
    },
    [toggleSaleActions],
  );

  return (
    <PrincipalView>
      <Appbar.Header>
        <Appbar.Content title={'Ventas'} />
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
            emptyIcon={'cart-remove'}
            emptyMessage={'No hay ventas registradas'}
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
          refNavigation.current?.navigate(StackScreenName.SALE_MANAGER);
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
