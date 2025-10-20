import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { DatabaseName } from '../enums/DatabaseName';

export const ClientSchema = sqliteTable(DatabaseName.CLIENTS, {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text({ length: 50 }).notNull(),
  email: text({ length: 50 }),
  phone: text({ length: 15 }),
});
