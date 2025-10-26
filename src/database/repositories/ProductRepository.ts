import { eq } from 'drizzle-orm';
import { db } from '../database';
import { IRepository } from '../interfaces/IRepository';
import { ProductModel } from '../interfaces/models/ProductModel';
import { ProductSchema } from '../schemas/ProductSchema';

export class ProductRepository implements IRepository<ProductModel, number> {
  public async create(data: ProductModel) {
    await db.insert(ProductSchema).values(data);
  }

  public async delete(id: number) {
    await db.delete(ProductSchema).where(eq(ProductSchema.id, id));
  }

  public async update(id: number, data: ProductModel) {
    await db.update(ProductSchema).set(data).where(eq(ProductSchema.id, id));
  }

  public async findAll() {
    const clients = await db.select().from(ProductSchema);

    return clients;
  }

  public async find(id: number) {
    const client = await db
      .select()
      .from(ProductSchema)
      .where(eq(ProductSchema.id, id));

    return client[0];
  }

  public async exist(id: number) {
    const find = await this.find(id);

    return Boolean(find);
  }
}
