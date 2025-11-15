import { TextInput } from 'react-native-paper';
import FormController from './scripts/FormController';
import { CurrencyInput } from '../CurrencyInput';
import CustomPicker from '../CustomPicker';

export default {
  TextInput: FormController(TextInput),
  CurrencyInput: FormController(CurrencyInput),
  CustomPicker: FormController(CustomPicker),
};
