import { integer, real, sqliteTable } from 'drizzle-orm/sqlite-core';
import { DatabaseName } from '../enums/DatabaseName';

export const SaleItemSchema = sqliteTable(DatabaseName.SALE_ITEMS, {
  id: integer().primaryKey({ autoIncrement: true }).notNull(),
  id_product: integer().notNull(),
  id_sale: integer().notNull(),
  price: real().notNull(),
  quantity: real().notNull(),
});
