import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { DatabaseName } from '../enums/DatabaseName';

export const ProductSchema = sqliteTable(DatabaseName.PRODUCTS, {
  id: integer().primaryKey({ autoIncrement: true }).notNull(),
  name: text({ length: 50 }).notNull(),
  price: real().notNull(),
  description: text(),
  id_category: integer().notNull(),
  expire: integer({ mode: 'timestamp' }),
});
