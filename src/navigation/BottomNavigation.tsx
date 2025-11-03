import React from 'react';
import { BottomRoutes } from '@/constants/BottomRoutes';
import { BottomNavigation as NativeBottomNavigation } from 'react-native-paper';
import { BottomScreenName } from '@/enums/BottomScreenName';
import { HomeScreen } from '@/pages/HomeScreen';
import { SaleScreen } from '@/pages/SaleScreen';
import { ProductScreen } from '@/pages/ProductScreen';
import { ClientScreen } from '@/pages/ClientScreen';

export const BottomNavigation = React.memo(function () {
  const [index, setIndex] = React.useState(0);

  const renderScene = NativeBottomNavigation.SceneMap({
    [BottomScreenName.HOME]: HomeScreen,
    [BottomScreenName.SALES]: SaleScreen,
    [BottomScreenName.PRODUCTS]: ProductScreen,
    [BottomScreenName.CLIENTS]: ClientScreen,
  });

  return (
    <NativeBottomNavigation
      navigationState={{ index: index, routes: BottomRoutes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
});
