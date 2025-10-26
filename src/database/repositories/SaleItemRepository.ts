import { eq } from 'drizzle-orm';
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
    const clients = await db.select().from(SaleItemSchema);

    return clients;
  }

  public async find(id: number) {
    const client = await db
      .select()
      .from(SaleItemSchema)
      .where(eq(SaleItemSchema.id, id));

    return client[0];
  }

  public async exist(id: number) {
    const find = await this.find(id);

    return Boolean(find);
  }
}
