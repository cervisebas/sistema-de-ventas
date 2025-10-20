import { integer, real, sqliteTable } from 'drizzle-orm/sqlite-core';
import { DatabaseName } from '../enums/DatabaseName';

export const SaleSchema = sqliteTable(DatabaseName.SALE_ITEMS, {
  id: integer().primaryKey({ autoIncrement: true }).notNull(),
  date: integer({ mode: 'timestamp' }).notNull(),
  price: real().notNull(),
  discount: real().notNull(),
  id_client: integer().notNull(),
});
