import { BottomScreenName } from '@/enums/BottomScreenName';
import { BottomNavigationProps } from 'react-native-paper';
import { BaseRoute } from 'react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation';

export const BottomRoutes: BottomNavigationProps<BaseRoute>['navigationState']['routes'] =
  [
    {
      key: BottomScreenName.HOME,
      title: 'Principal',
      focusedIcon: 'home',
      unfocusedIcon: 'home-outline',
    },
    {
      key: BottomScreenName.SALES,
      title: 'Ventas',
      focusedIcon: 'sale',
      unfocusedIcon: 'sale-outline',
    },
    {
      key: BottomScreenName.PRODUCTS,
      title: 'Productos',
      focusedIcon: 'cart',
      unfocusedIcon: 'cart-outline',
    },
    {
      key: BottomScreenName.CLIENTS,
      title: 'Clientes',
      focusedIcon: 'account-group',
      unfocusedIcon: 'account-group-outline',
    },
  ];
