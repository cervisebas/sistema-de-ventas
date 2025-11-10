import React, { useRef } from 'react';
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

export const ClientManager = React.memo(function (props: StackScreenProps) {
  const { left, right } = useSafeArea(16);

  const formGroup = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });
  const inputNext =
    useNextInput<keyof (typeof formGroup.control)['_defaultValues']>();

  const clientController = useRef(new ClientController());

  const submitForm = formGroup.handleSubmit(async function ({
    name,
    email,
    phone,
  }) {
    try {
      refDialog.current?.showLoading('Creando cliente...');

      await clientController.current.create(name, email, phone);

      refNavigation.current?.goBack();
      toast.success('Cliente creado correctamente.');
      refDialog.current?.showLoading(false);
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
        <Appbar.Content title={'Crear cliente'} />
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
            {...inputNext.toNext('name', 'email')}
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

          <FormElements.TextInput
            {...inputNext.toNext('email', 'phone')}
            name={'email'}
            rules={{
              required: true,
              minLength: 5,
            }}
            className={'w-full'}
            control={formGroup.control}
            formState={formGroup.formState}
            style={styles.inputs}
            label={'Correo electronico'}
            mode={'outlined'}
            secureTextEntry={false}
            keyboardType={'email-address'}
            autoCapitalize={'none'}
            errorMessage={'Ingrese un correo valido.'}
          />

          <FormElements.TextInput
            {...inputNext.toNext('phone', submitForm)}
            name={'phone'}
            rules={{
              required: true,
              minLength: 10,
            }}
            className={'w-full'}
            control={formGroup.control}
            formState={formGroup.formState}
            style={styles.inputs}
            label={'Numero de teléfono'}
            mode={'outlined'}
            secureTextEntry={false}
            keyboardType={'phone-pad'}
            errorMessage={'Ingrese un numero de teléfono valido.'}
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
