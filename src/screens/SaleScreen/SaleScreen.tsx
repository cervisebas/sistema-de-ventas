import { PrincipalView } from '@/components/PrincipalView';
import SafeArea from '@/components/SafeArea';
import { refNavigation } from '@/constants/Refs';
import { ProductController } from '@/database/controllers/ProductController';
import { TableName } from '@/database/enums/TableName';
import { useLiveDatabase } from '@/database/hooks/useLiveDatabase';
import { StackScreenName } from '@/enums/StackScreenName';
import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

const ITEM_HEIGHT = 56;

export function SaleScreen() {
  const controller = useRef(new ProductController());
  const { data, loading, refresh, error, reloadData } = useLiveDatabase(
    TableName.PRODUCTS,
    controller.current,
  );

  console.log(data);

  return (
    <PrincipalView>
      <Appbar.Header>
        <Appbar.Content title={'Ventas'} />
      </Appbar.Header>

      <SafeArea.FAB
        icon={'plus'}
        style={styles.fab}
        expandArea={{
          bottom: 16,
          right: 16,
        }}
        onPress={() => {
          refNavigation.current?.navigate(StackScreenName.SALE_MANAGER);
        }}
      />
    </PrincipalView>
  );
}

const styles = StyleSheet.create({
  fab: {
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  items: {
    height: ITEM_HEIGHT,
  },
});
