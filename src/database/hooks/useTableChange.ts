import { useEffect, useRef } from 'react';
import { addDatabaseChangeListener } from 'expo-sqlite';

export function useTableChanges(
  selectedTableName: string | string[],
  callback?: () => void,
  dep: any[] = [],
  coldDownTime = 1000,
) {
  const coldDown = useRef(false);

  useEffect(() => {
    const subscription = addDatabaseChangeListener((event) => {
      const { tableName } = event;

      const includesInArray =
        Array.isArray(selectedTableName) &&
        selectedTableName.includes(tableName);
      const selectedTable = tableName === selectedTableName;

      if (includesInArray || selectedTable) {
        if (coldDown.current) {
          return;
        }

        callback?.();
        coldDown.current = true;

        setTimeout(() => {
          coldDown.current = false;
        }, coldDownTime);
      }
    });

    return () => subscription.remove();
  }, [dep]);
}
