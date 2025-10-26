import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { TableName } from '../enums/TableName';

export const ProductSchema = sqliteTable(TableName.PRODUCTS, {
  id: integer().primaryKey({ autoIncrement: true }).notNull(),
  name: text({ length: 50 }).notNull(),
  price: real().notNull(),
  description: text(),
  id_category: integer().notNull(),
  expire: integer({ mode: 'timestamp' }),
});
