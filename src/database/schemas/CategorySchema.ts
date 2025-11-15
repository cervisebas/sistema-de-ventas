import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { TableName } from '../enums/TableName';

export const CategorySchema = sqliteTable(TableName.CATEGORIES, {
  id: integer().primaryKey({ autoIncrement: true }).notNull(),
  name: text({ length: 50 }).notNull(),
  delete: integer({ mode: 'boolean' }).default(false),
});
