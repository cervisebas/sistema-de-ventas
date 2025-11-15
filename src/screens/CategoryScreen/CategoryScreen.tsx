import FlatListDynamicItems from '@/components/FlatListDynamicItems';
import { LoadingErrorContent } from '@/components/LoadingErrorContent';
import { PrincipalView } from '@/components/PrincipalView';
import SafeArea from '@/components/SafeArea';
import { refDialog, refNavigation } from '@/constants/Refs';
import { CategoryController } from '@/database/controllers/CategoryController';
import { TableName } from '@/database/enums/TableName';
import { useLiveDatabase } from '@/database/hooks/useLiveDatabase';
import { Category } from '@/database/interfaces/entities/Category';
import { StackScreenName } from '@/enums/StackScreenName';
import { StackScreenProps } from '@/interfaces/StackScreenProps';
import { useRef, useCallback } from 'react';
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { List, Appbar } from 'react-native-paper';
import { toast } from 'sonner-native';

const ITEM_HEIGHT = 52;

export function CategoryScreen(props: StackScreenProps) {
  const controller = useRef(new CategoryController());
  const { data, loading, refresh, error, reloadData } = useLiveDatabase(
    TableName.CATEGORIES,
    controller.current,
  );

  const deleteClient = useCallback((category: Category) => {
    refDialog.current?.showAlert({
      message: `¿Estas seguro de eliminar la categoria "${category.name}"?`,
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Eliminar',
          async onPress() {
            try {
              refDialog.current?.showLoading('Eliminando categoria...');
              await controller.current.delete(category.id as number);
              toast.success('Se elimino el categoria correctamente');
            } catch (error) {
              console.error(error);
              toast.error('Ocurrio un error al eliminar el categoria');
            } finally {
              refDialog.current?.showLoading(false);
            }
          },
        },
      ],
    });
  }, []);

  const toggleCategoryActions = useCallback(
    (category: Category) => {
      refDialog.current?.showBottomSheetOptions('Acciónes rapidas', [
        {
          leftIcon: 'pencil-outline',
          label: 'Editar categoria',
          onPress() {
            refNavigation.current?.navigate(
              StackScreenName.CATEGORY_MANAGER,
              category,
            );
          },
        },
        {
          leftIcon: 'delete-outline',
          label: 'Eliminar categoria',
          onPress() {
            deleteClient(category);
          },
        },
      ]);
    },
    [deleteClient],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Category>) => {
      return (
        <List.Item
          left={(p) => <List.Icon {...p} icon={'shape-outline'} />}
          right={(p) => <List.Icon {...p} icon={'dots-vertical'} />}
          title={item.name}
          style={styles.items}
          onPress={() => toggleCategoryActions(item)}
        />
      );
    },
    [toggleCategoryActions],
  );

  return (
    <PrincipalView>
      <Appbar.Header>
        <Appbar.BackAction onPress={props.navigation.goBack} />
        <Appbar.Content title={'Categorias'} />
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
            emptyIcon={'shape-outline'}
            emptyMessage={'No hay categorias registrados'}
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
        expandDisableBottom={false}
        onPress={() => {
          refNavigation.current?.navigate(StackScreenName.CATEGORY_MANAGER);
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
