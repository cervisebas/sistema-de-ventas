import FormController, {
  BaseInput,
} from '@/components/form/scripts/FormController';
import { StyleSheet, View } from 'react-native';
import { Divider, IconButton, List, Text } from 'react-native-paper';
import { SaleItemFormItem } from '../SaleManager';
import { parseToCurrency } from '@/utils/parseToCurrency';
import { useLiveDatabase } from '@/database/hooks/useLiveDatabase';
import { ProductController } from '@/database/controllers/ProductController';
import { TableName } from '@/database/enums/TableName';
import React, { useCallback, useRef } from 'react';
import { refDialog } from '@/constants/Refs';
import { BottomSheetOptionsInterface } from '@/components/BottomSheetOptions';

export const SaleItemList = FormController(function (
  props: BaseInput<SaleItemFormItem[]>,
) {
  const productController = useRef(new ProductController());
  const { data: dataProducts, loading: loadingProducts } = useLiveDatabase(
    TableName.PRODUCTS,
    productController.current,
  );

  const addNewItem = useCallback(() => {
    const productOptions = dataProducts.map<BottomSheetOptionsInterface>(
      (value) => ({
        label: value.name,
        description: parseToCurrency(value.price),
        leftIcon: 'cart-outline',
        onPress() {
          const alreadyExist = (props.value ?? []).find(
            (v) => v.product.id === value.id,
          );

          if (!alreadyExist) {
            props.onChangeText?.([
              ...(props.value ?? []),
              { quantity: 1, product: value },
            ]);
          }
        },
      }),
    );

    refDialog.current?.showBottomSheetOptions(
      'Seleccione un producto',
      productOptions,
    );
  }, [dataProducts, props]);

  const modifyQuantity = useCallback(
    (index: number, operation: number) => {
      const item = props.value![index];
      const array = props.value!.slice();

      item.quantity = item.quantity + operation;

      if (!item.quantity) {
        item.quantity = 1;
      }

      array[index] = item;

      props.onChangeText?.(array);
    },
    [props],
  );

  const removeProduct = useCallback(
    (index: number) => {
      const array = props.value!.slice();
      array.splice(index, 1);

      props.onChangeText?.(array);
    },
    [props],
  );

  return (
    <View className={'w-full flex-col gap-2'}>
      <View className={'w-full flex-row items-center justify-between px-4'}>
        <Text variant={'titleMedium'}>Lista de productos</Text>

        <IconButton
          icon={'plus'}
          loading={loadingProducts}
          onPress={addNewItem}
        />
      </View>

      {props.value?.map((item, index, array) => {
        const price = parseToCurrency(item.quantity * item.product.price);
        return (
          <React.Fragment key={`sale-item-${index}`}>
            <List.Item
              title={item.product.name}
              description={`Cantidad: ${item.quantity}\nPrecio: ${price}`}
              right={(p) => (
                <View {...p} className={'flex-row'}>
                  <IconButton
                    icon={'minus'}
                    mode={'contained'}
                    size={12}
                    onPress={() => modifyQuantity(index, -1)}
                  />
                  <IconButton
                    icon={'plus'}
                    mode={'contained'}
                    size={12}
                    onPress={() => modifyQuantity(index, 1)}
                  />
                  <IconButton
                    icon={'delete-outline'}
                    mode={'contained'}
                    size={12}
                    onPress={() => removeProduct(index)}
                  />
                </View>
              )}
            />

            {array[index + 1] && <Divider />}
          </React.Fragment>
        );
      })}

      {!props.value ||
        (props.value?.length === 0 && (
          <View style={styles.empty}>
            <Text variant={'bodyMedium'}>Sin productos añadidos</Text>
          </View>
        ))}
    </View>
  );
});

const styles = StyleSheet.create({
  empty: {
    paddingVertical: 56,
    alignItems: 'center',
  },
});
