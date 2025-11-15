import FormElements from '@/components/form/FormElements';
import { PrincipalView } from '@/components/PrincipalView';
import { refDialog, refNavigation } from '@/constants/Refs';
import { CategoryController } from '@/database/controllers/CategoryController';
import { Client } from '@/database/interfaces/entities/Client';
import useNextInput from '@/hooks/useNextInput';
import useSafeArea from '@/hooks/useSafeArea';
import { StackScreenProps } from '@/interfaces/StackScreenProps';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Appbar } from 'react-native-paper';
import { toast } from 'sonner-native';

export function CategoryManager(props: StackScreenProps) {
  const editData = props.route.params as Client | undefined;
  const { left, right } = useSafeArea(16);

  const formGroup = useForm({
    defaultValues: {
      name: editData?.name || '',
    },
  });
  const inputNext =
    useNextInput<keyof (typeof formGroup.control)['_defaultValues']>();

  const categoryController = useRef(new CategoryController());

  const submitForm = formGroup.handleSubmit(async function ({ name }) {
    try {
      if (!editData?.id) {
        refDialog.current?.showLoading('Creando categoria...');

        await categoryController.current.create(name);

        toast.success('Categoria creado correctamente.');
      } else {
        refDialog.current?.showLoading('Editando categoria...');

        await categoryController.current.update(editData.id, name);

        toast.success('Categoria editado correctamente.');
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
          title={editData ? 'Editar categoria' : 'Crear categoria'}
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
            {...inputNext.toNext('name', submitForm)}
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
        </View>
      </KeyboardAwareScrollView>
    </PrincipalView>
  );
}

const styles = StyleSheet.create({
  inputs: {
    width: '100%',
    height: 46,
  },
});
