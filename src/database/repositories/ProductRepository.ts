import { eq, inArray, not } from 'drizzle-orm';
import { db } from '../database';
import { IRepository } from '../interfaces/IRepository';
import { ProductModel } from '../interfaces/models/ProductModel';
import { ProductSchema } from '../schemas/ProductSchema';

export class ProductRepository implements IRepository<ProductModel, number> {
  public async create(data: ProductModel) {
    await db.insert(ProductSchema).values(data);
  }

  public async delete(id: number) {
    await db
      .update(ProductSchema)
      .set({
        delete: true,
      })
      .where(eq(ProductSchema.id, id));
  }

  public async update(id: number, data: ProductModel) {
    await db.update(ProductSchema).set(data).where(eq(ProductSchema.id, id));
  }

  public async findAll() {
    const data = await db
      .select()
      .from(ProductSchema)
      .where(not(eq(ProductSchema.delete, true)));

    return data;
  }

  public async find(id: number) {
    const data = await db
      .select()
      .from(ProductSchema)
      .where(eq(ProductSchema.id, id));

    return data[0];
  }

  public async exist(id: number) {
    const find = await this.find(id);

    return Boolean(find);
  }

  public async findMany(id: number[]) {
    const data = await db
      .select()
      .from(ProductSchema)
      .where(inArray(ProductSchema.id, id));

    return data;
  }
}
