import { integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { DatabaseName } from '../enums/DatabaseName';

export const DiscountSchema = sqliteTable(DatabaseName.DISCOUNTS, {
  id: integer().primaryKey({ autoIncrement: true }).notNull(),
  id_product: integer().notNull(),
  startDate: integer({ mode: 'timestamp' }).notNull(),
  endDate: integer({ mode: 'timestamp' }).notNull(),
});
