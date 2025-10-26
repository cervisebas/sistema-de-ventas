import { eq } from 'drizzle-orm';
import { db } from '../database';
import { IRepository } from '../interfaces/IRepository';
import { SaleModel } from '../interfaces/models/SaleModel';
import { SaleSchema } from '../schemas/SaleSchema';

export class SaleRepository implements IRepository<SaleModel, number> {
  public async create(data: SaleModel) {
    await db.insert(SaleSchema).values(data);
  }

  public async delete(id: number) {
    await db.delete(SaleSchema).where(eq(SaleSchema.id, id));
  }

  public async update(id: number, data: SaleModel) {
    await db.update(SaleSchema).set(data).where(eq(SaleSchema.id, id));
  }

  public async findAll() {
    const clients = await db.select().from(SaleSchema);

    return clients;
  }

  public async find(id: number) {
    const client = await db
      .select()
      .from(SaleSchema)
      .where(eq(SaleSchema.id, id));

    return client[0];
  }

  public async exist(id: number) {
    const find = await this.find(id);

    return Boolean(find);
  }
}
