import { DialogInterface } from '@/interfaces/DialogInterface';
import {
  NavigationContainerRef,
  ParamListBase,
} from '@react-navigation/native';
import { createRef } from 'react';

export const refDialog = createRef<DialogInterface.IRef>();
export const refNavigation = createRef<NavigationContainerRef<ParamListBase>>();
