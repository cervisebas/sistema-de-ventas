import { integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { TableName } from '../enums/TableName';

export const DiscountSchema = sqliteTable(TableName.DISCOUNTS, {
  id: integer().primaryKey({ autoIncrement: true }).notNull(),
  id_product: integer().notNull(),
  startDate: integer({ mode: 'timestamp' }).notNull(),
  endDate: integer({ mode: 'timestamp' }).notNull(),
});
