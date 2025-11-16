import { BottomSheetOptionsInterface } from '@/components/BottomSheetOptions';
import FlatListDynamicItems from '@/components/FlatListDynamicItems';
import { LoadingErrorContent } from '@/components/LoadingErrorContent';
import { MenuAppbar, MenuAppbarOption } from '@/components/MenuAppbar';
import { PrincipalView } from '@/components/PrincipalView';
import SafeArea from '@/components/SafeArea';
import { refDialog, refNavigation } from '@/constants/Refs';
import { ProductController } from '@/database/controllers/ProductController';
import { TableName } from '@/database/enums/TableName';
import { useLiveDatabase } from '@/database/hooks/useLiveDatabase';
import { Product } from '@/database/interfaces/entities/Product';
import { StackScreenName } from '@/enums/StackScreenName';
import { parseToCurrency } from '@/utils/parseToCurrency';
import React, { useCallback, useRef } from 'react';
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Appbar, List } from 'react-native-paper';
import { toast } from 'sonner-native';

const MENU_OPTIONS: MenuAppbarOption[] = [
  {
    label: 'Categorias',
    icon: 'shape-outline',
    onPress() {
      refNavigation.current?.navigate(StackScreenName.CATEGORIES);
    },
  },
];
const ITEM_HEIGHT = 62;

export function ProductScreen() {
  const controller = useRef(new ProductController());
  const { data, loading, refresh, error, reloadData } = useLiveDatabase(
    TableName.PRODUCTS,
    controller.current,
  );

  const deleteProduct = useCallback((product: Product) => {
    refDialog.current?.showAlert({
      message: `¿Estas seguro de eliminar el producto "${product.name}"?`,
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Eliminar',
          async onPress() {
            try {
              refDialog.current?.showLoading('Eliminando cliente...');
              await controller.current.delete(product.id as number);
              toast.success('Se elimino el cliente correctamente');
            } catch (error) {
              console.error(error);
              toast.error('Ocurrio un error al eliminar el cliente');
            } finally {
              refDialog.current?.showLoading(false);
            }
          },
        },
      ],
    });
  }, []);

  const toggleClientActions = useCallback(
    (product: Product) => {
      const information: BottomSheetOptionsInterface[] = [];
      information.push({
        leftIcon: 'alpha-t-circle-outline',
        label: 'Nombre completo',
        description: product.name,
      });

      information.push({
        leftIcon: 'currency-usd',
        label: 'Precio',
        description: product.name,
      });

      if (product.description) {
        information.push({
          leftIcon: 'text',
          label: 'Descripción',
          description: product.description,
        });
      }

      information.push({
        leftIcon: 'shape-outline',
        label: 'Categoria',
        description: product.category.name,
      });

      refDialog.current?.showBottomSheetOptions('Opciónes', {
        'Información de producto': information,
        'Acciónes rapidas': [
          {
            leftIcon: 'pencil-outline',
            label: 'Editar producto',
            onPress() {
              refNavigation.current?.navigate(
                StackScreenName.PRODUCT_MANAGER,
                product,
              );
            },
          },
          {
            leftIcon: 'delete-outline',
            label: 'Eliminar producto',
            onPress() {
              deleteProduct(product);
            },
          },
        ],
      });
    },
    [deleteProduct],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Product>) => {
      return (
        <List.Item
          left={(p) => <List.Icon {...p} icon={'cart-outline'} />}
          right={(p) => <List.Icon {...p} icon={'dots-vertical'} />}
          title={item.name}
          description={parseToCurrency(item.price)}
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
        <Appbar.Content title={'Productos'} />
        <MenuAppbar
          icon={'dots-vertical-circle-outline'}
          options={MENU_OPTIONS}
        />
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
            emptyMessage={'No hay productos registrados'}
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
          refNavigation.current?.navigate(StackScreenName.PRODUCT_MANAGER);
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
