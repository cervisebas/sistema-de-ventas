import { useCallback, useEffect, useState } from 'react';
import { useTableChanges } from './useTableChange';
import { IController } from '../interfaces/IController';

export function useLiveDatabase<K, E extends object>(
  tableName: string | string[],
  service: IController<K, E>,
) {
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [data, setData] = useState<E[]>([]);

  const getData = useCallback(async () => {
    try {
      setRefresh(true);

      const _data = await service.findAll();
      setData(_data);
    } catch (error) {
      setError(String(error));
    } finally {
      setLoading(false);
      setRefresh(false);
    }
  }, [service]);

  useEffect(() => {
    getData();
  }, []);

  useTableChanges(tableName, () => getData(), [service]);

  return { loading, refresh, error, data, reloadData: getData };
}
