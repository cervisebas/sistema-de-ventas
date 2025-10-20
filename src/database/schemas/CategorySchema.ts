import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { DatabaseName } from '../enums/DatabaseName';

export const CategorySchema = sqliteTable(DatabaseName.CATEGORIES, {
  id: integer().primaryKey({ autoIncrement: true }).notNull(),
  name: text({ length: 50 }),
});
