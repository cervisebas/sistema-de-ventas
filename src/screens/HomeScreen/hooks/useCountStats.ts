import { ClientController } from '@/database/controllers/ClientController';
import { ProductController } from '@/database/controllers/ProductController';
import { SaleController } from '@/database/controllers/SaleController';
import { TableName } from '@/database/enums/TableName';
import { useTableChanges } from '@/database/hooks/useTableChange';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useCountStats() {
  const [clients, setClients] = useState(0);
  const [products, setProducts] = useState(0);
  const [sales, setSales] = useState(0);

  const clientsController = useRef(new ClientController());
  const productsController = useRef(new ProductController());
  const salesController = useRef(new SaleController());

  const loadData = useCallback(async () => {
    const [_clients, _products, _sales] = await Promise.all([
      clientsController.current.count(),
      productsController.current.count(),
      salesController.current.count(),
    ]);

    setClients(_clients);
    setProducts(_products);
    setSales(_sales);
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  useTableChanges(
    [TableName.CLIENTS, TableName.PRODUCTS, TableName.SALES],
    () => loadData(),
    [],
  );

  return {
    clients,
    products,
    sales,
  };
}
