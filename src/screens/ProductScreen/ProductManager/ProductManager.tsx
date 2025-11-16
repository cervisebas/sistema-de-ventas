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
import { refDialog, refNavigation } from '@/constants/Refs';
import { toast } from 'sonner-native';
import { ProductController } from '@/database/controllers/ProductController';
import { Product } from '@/database/interfaces/entities/Product';
import { useLiveDatabase } from '@/database/hooks/useLiveDatabase';
import { TableName } from '@/database/enums/TableName';
import { CategoryController } from '@/database/controllers/CategoryController';
import { PickerOption } from '@/components/CustomPicker';

export const ProductManager = React.memo(function (props: StackScreenProps) {
  const editData = props.route.params as Product | undefined;
  const { left, right } = useSafeArea(16);

  const categoryController = useRef(new CategoryController());
  const { data: dataCategories, loading: loadingCategories } = useLiveDatabase(
    TableName.CLIENTS,
    categoryController.current,
  );

  const categoryOptions = useMemo(() => {
    return dataCategories.map<PickerOption>((value) => ({
      label: value.name,
      value: value.id,
    }));
  }, [dataCategories]);

  const formGroup = useForm({
    defaultValues: {
      name: editData?.name || '',
      price: editData?.price || 0,
      description: editData?.description || '',
      id_category: editData?.category.id || undefined,
      expire: editData?.expire || null,
    },
  });
  const inputNext =
    useNextInput<keyof (typeof formGroup.control)['_defaultValues']>();

  const productController = useRef(new ProductController());

  const submitForm = formGroup.handleSubmit(async function ({
    name,
    price,
    description,
    id_category,
    expire,
  }) {
    try {
      if (!editData?.id) {
        refDialog.current?.showLoading('Creando producto...');

        await productController.current.create(
          name,
          price,
          description,
          id_category!,
          expire,
        );

        toast.success('Producto creado correctamente.');
      } else {
        refDialog.current?.showLoading('Editando producto...');

        await productController.current.update(
          editData.id,
          name,
          price,
          description,
          id_category!,
          expire,
        );

        toast.success('Producto editado correctamente.');
      }

      refDialog.current?.showLoading(false);
      refNavigation.current?.goBack();
    } catch (error) {
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
        <Appbar.Content
          title={editData ? 'Editar producto' : 'Crear producto'}
        />
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
            {...inputNext.toNext('name', 'price')}
            name={'name'}
            rules={{
              required: true,
              minLength: 2,
            }}
            className={'w-full'}
            control={formGroup.control}
            formState={formGroup.formState}
            style={styles.inputs}
            label={'Nombre completo'}
            mode={'outlined'}
            secureTextEntry={false}
            autoCapitalize={'words'}
            errorMessage={'Ingrese un nombre valido.'}
          />

          <FormElements.CurrencyInput
            {...inputNext.toNext('price', 'description')}
            name={'price'}
            rules={{
              required: true,
            }}
            className={'w-full'}
            control={formGroup.control}
            formState={formGroup.formState}
            style={styles.inputs}
            label={'Precio'}
            mode={'outlined'}
            secureTextEntry={false}
            keyboardType={'number-pad'}
            autoCapitalize={'none'}
            errorMessage={'Ingrese un precio valido.'}
          />

          <FormElements.TextInput
            {...inputNext.toNext('description', 'id_category')}
            name={'description'}
            rules={{
              required: false,
            }}
            className={'w-full'}
            control={formGroup.control}
            formState={formGroup.formState}
            style={styles.inputs}
            label={'Descripción'}
            mode={'outlined'}
            secureTextEntry={false}
          />

          <FormElements.CustomPicker
            {...inputNext.toNext('id_category')}
            name={'id_category'}
            rules={{
              required: true,
            }}
            options={categoryOptions}
            disabled={loadingCategories || !dataCategories.length}
            control={formGroup.control}
            formState={formGroup.formState}
            style={styles.inputs}
            label={'Categoria'}
            errorMessage={'Seleccione una categoria'}
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
