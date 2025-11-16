import { count, eq, inArray } from 'drizzle-orm';
import { db } from '../database';
import { IRepository } from '../interfaces/IRepository';
import { SaleItemModel } from '../interfaces/models/SaleItemModel';
import { SaleItemSchema } from '../schemas/SaleItemSchema';

export class SaleItemRepository implements IRepository<SaleItemModel, number> {
  public async create(data: SaleItemModel) {
    await db.insert(SaleItemSchema).values(data);
  }

  public async delete(id: number) {
    await db.delete(SaleItemSchema).where(eq(SaleItemSchema.id, id));
  }

  public async update(id: number, data: SaleItemModel) {
    await db.update(SaleItemSchema).set(data).where(eq(SaleItemSchema.id, id));
  }

  public async findAll() {
    const data = await db.select().from(SaleItemSchema);

    return data;
  }

  public async find(id: number) {
    const data = await db
      .select()
      .from(SaleItemSchema)
      .where(eq(SaleItemSchema.id, id));

    return data[0];
  }

  public async exist(id: number) {
    const find = await this.find(id);

    return Boolean(find);
  }

  public async findMany(id: number[]) {
    const data = await db
      .select()
      .from(SaleItemSchema)
      .where(inArray(SaleItemSchema.id, id));

    return data;
  }

  public async findBySale(id_sale: number) {
    const data = await db
      .select()
      .from(SaleItemSchema)
      .where(eq(SaleItemSchema.id_sale, id_sale));

    return data;
  }

  public async count() {
    const [{ count: _count }] = await db
      .select({ count: count(SaleItemSchema.id) })
      .from(SaleItemSchema);

    return _count;
  }
}
