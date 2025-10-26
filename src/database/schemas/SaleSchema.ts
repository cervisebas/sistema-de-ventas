import { integer, real, sqliteTable } from 'drizzle-orm/sqlite-core';
import { TableName } from '../enums/TableName';

export const SaleSchema = sqliteTable(TableName.SALE_ITEMS, {
  id: integer().primaryKey({ autoIncrement: true }).notNull(),
  date: integer({ mode: 'timestamp' }).notNull(),
  price: real().notNull(),
  discount: real().notNull(),
  id_client: integer().notNull(),
});
