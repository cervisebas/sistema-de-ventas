import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { TableName } from '../enums/TableName';

export const ClientSchema = sqliteTable(TableName.CLIENTS, {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text({ length: 50 }).notNull(),
  email: text({ length: 50 }),
  phone: text({ length: 15 }),
  delete: integer({ mode: 'boolean' }).default(false),
});
