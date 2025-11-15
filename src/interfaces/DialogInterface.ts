import { BottomSheetOptionsRef } from '@/components/BottomSheetOptions';
import React from 'react';

export namespace DialogInterface {
  export interface IProps {}

  export interface IRef {
    showLoading: (message: string | false) => void;
    showAlert: AlertRef['open'];
    showBottomSheetOptions: BottomSheetOptionsRef['open'];
  }

  export interface LoadingRef {
    open: (message: string) => void;
    close: () => void;
  }

  export interface AlertButtons {
    text: string;
    color?: string;
    onPress?: () => void;
  }

  export interface AlertRef {
    open: (props: {
      title?: string;
      message?: string | React.ReactNode;
      buttons?: AlertButtons[];
      dismissable?: boolean;
      showOk?: boolean;
      textOk?: string;
      onClose?: () => void;
    }) => void;
    close: () => void;
  }
}
