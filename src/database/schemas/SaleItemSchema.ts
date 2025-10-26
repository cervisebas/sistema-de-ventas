import { integer, real, sqliteTable } from 'drizzle-orm/sqlite-core';
import { TableName } from '../enums/TableName';

export const SaleItemSchema = sqliteTable(TableName.SALE_ITEMS, {
  id: integer().primaryKey({ autoIncrement: true }).notNull(),
  id_product: integer().notNull(),
  id_sale: integer().notNull(),
  price: real().notNull(),
  quantity: real().notNull(),
});
