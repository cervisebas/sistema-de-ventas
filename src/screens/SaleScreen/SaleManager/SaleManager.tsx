import React, { useMemo, useRef } from 'react';
import { PrincipalView } from '@/components/PrincipalView';
import { StackScreenProps } from '@/interfaces/StackScreenProps';
import { Appbar } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { ScrollView, StyleSheet, View } from 'react-native';
import FormElements from '@/components/form/FormElements';
import { useForm } from 'react-hook-form';
import useNextInput from '@/hooks/useNextInput';
import useSafeArea from '@/hooks/useSafeArea';
import { ClientController } from '@/database/controllers/ClientController';
import { refDialog, refNavigation } from '@/constants/Refs';
import { toast } from 'sonner-native';
import { Sale } from '@/database/interfaces/entities/Sale';
import { Product } from '@/database/interfaces/entities/Product';
import { SaleController } from '@/database/controllers/SaleController';
import { SaleItemController } from '@/database/controllers/SaleItemController';
import { useLiveDatabase } from '@/database/hooks/useLiveDatabase';
import { TableName } from '@/database/enums/TableName';
import { PickerOption } from '@/components/CustomPicker';
import { SaleItemList } from './components/SaleItemList';

export interface SaleItemFormItem {
  id?: number;
  product: Product;
  quantity: number;
}

export const SaleManager = React.memo(function (props: StackScreenProps) {
  const editData = props.route.params as Sale | undefined;
  const { left, right } = useSafeArea(16);

  const clientController = useRef(new ClientController());
  const { data: dataCategories, loading: clientCategories } = useLiveDatabase(
    TableName.PRODUCTS,
    clientController.current,
  );

  const clientOptions = useMemo(() => {
    return dataCategories.map<PickerOption>((value) => ({
      label: value.name,
      value: value.id,
    }));
  }, [dataCategories]);

  const formGroup = useForm({
    defaultValues: {
      discount: editData?.discount || '0',
      client: null as number | null,
      items: [] as SaleItemFormItem[],
    },
  });
  const inputNext =
    useNextInput<keyof (typeof formGroup.control)['_defaultValues']>();

  const saleController = useRef(new SaleController());
  const saleItemController = useRef(new SaleItemController());

  const submitForm = formGroup.handleSubmit(async function ({
    discount,
    client,
    items,
  }) {
    try {
      const totalPrice = items.reduce((prev, curr) => {
        return prev + curr.quantity * curr.product.price;
      }, 0);

      if (!editData?.id) {
        refDialog.current?.showLoading('Creando venta...');

        const new_id = await saleController.current.create(
          new Date(),
          totalPrice,
          Number(discount),
          client,
        );

        console.log(new_id);
        console.log(JSON.stringify(items));

        await Promise.all(
          items.map((v) =>
            saleItemController.current.create(
              v.product.id!,
              new_id,
              v.product.price * v.quantity,
              v.quantity,
            ),
          ),
        );

        toast.success('Venta generada correctamente.');
      } else {
        refDialog.current?.showLoading('Editando cliente...');

        await saleController.current.update(
          editData.id!,
          editData.date,
          totalPrice,
          Number(discount),
          client,
        );

        await Promise.all(
          items
            .filter((v) => v.id !== undefined)
            .map((v) => saleItemController.current.delete(v.id!)),
        );

        await Promise.all(
          items.map((v) =>
            saleItemController.current.create(
              v.product.id!,
              editData.id!,
              v.product.price * v.quantity,
              v.quantity,
            ),
          ),
        );

        toast.success('Cliente editado correctamente.');
      }

      refDialog.current?.showLoading(false);
      refNavigation.current?.goBack();
    } catch (error) {
      console.error(error);
      refDialog.current?.showLoading(false);
      refDialog.current?.showAlert({
        message: String(error),
        showOk: true,
      });
    }
  });

  return (
    <PrincipalView hideKeyboard>
      <Appbar.Header>
        <Appbar.BackAction onPress={props.navigation.goBack} />
        <Appbar.Content title={editData ? 'Editar venta' : 'Generar venta'} />
        <Appbar.Action icon={'send'} onPress={submitForm} />
      </Appbar.Header>

      <KeyboardAwareScrollView
        ScrollViewComponent={ScrollView}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        bottomOffset={80}
      >
        <View
          className={'flex flex-col gap-4 pt-4'}
          style={{ paddingLeft: left, paddingRight: right }}
        >
          <FormElements.TextInput
            {...inputNext.toNext('discount', 'client')}
            name={'discount'}
            rules={{
              required: true,
              min: 0,
              max: 100,
            }}
            className={'w-full'}
            control={formGroup.control}
            formState={formGroup.formState}
            style={styles.inputs}
            label={'Descuento'}
            mode={'outlined'}
            keyboardType={'number-pad'}
            errorMessage={'Ingrese un descuento valido.'}
          />

          <FormElements.CustomPicker
            {...inputNext.toNext('client')}
            name={'client'}
            rules={{
              required: false,
            }}
            disabled={clientCategories || !clientOptions.length}
            options={clientOptions}
            control={formGroup.control}
            formState={formGroup.formState}
            style={styles.inputs}
            label={'Cliente'}
          />

          <SaleItemList
            name={'items'}
            rules={{
              required: false,
            }}
            control={formGroup.control}
            formState={formGroup.formState}
          />
        </View>
      </KeyboardAwareScrollView>
    </PrincipalView>
  );
});

const styles = StyleSheet.create({
  inputs: {
    width: '100%',
    height: 46,
  },
});
