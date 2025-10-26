import { eq } from 'drizzle-orm';
import { db } from '../database';
import { IRepository } from '../interfaces/IRepository';
import { DiscountModel } from '../interfaces/models/DiscountModel';
import { DiscountSchema } from '../schemas/DiscountSchema';

export class DiscountRepository implements IRepository<DiscountModel, number> {
  public async create(data: DiscountModel) {
    await db.insert(DiscountSchema).values(data);
  }

  public async delete(id: number) {
    await db.delete(DiscountSchema).where(eq(DiscountSchema.id, id));
  }

  public async update(id: number, data: DiscountModel) {
    await db.update(DiscountSchema).set(data).where(eq(DiscountSchema.id, id));
  }

  public async findAll() {
    const clients = await db.select().from(DiscountSchema);

    return clients;
  }

  public async find(id: number) {
    const client = await db
      .select()
      .from(DiscountSchema)
      .where(eq(DiscountSchema.id, id));

    return client[0];
  }

  public async exist(id: number) {
    const find = await this.find(id);

    return Boolean(find);
  }
}
