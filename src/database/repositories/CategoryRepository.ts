import { eq, inArray } from 'drizzle-orm';
import { db } from '../database';
import { IRepository } from '../interfaces/IRepository';
import { CategoryModel } from '../interfaces/models/CategoryModel';
import { CategorySchema } from '../schemas/CategorySchema';

export class CategoryRepository implements IRepository<CategoryModel, number> {
  public async create(data: CategoryModel) {
    await db.insert(CategorySchema).values(data);
  }

  public async delete(id: number) {
    await db.delete(CategorySchema).where(eq(CategorySchema.id, id));
  }

  public async update(id: number, data: CategoryModel) {
    await db.update(CategorySchema).set(data).where(eq(CategorySchema.id, id));
  }

  public async findAll() {
    const data = await db.select().from(CategorySchema);

    return data;
  }

  public async find(id: number) {
    const data = await db
      .select()
      .from(CategorySchema)
      .where(eq(CategorySchema.id, id));

    return data[0];
  }

  public async exist(id: number) {
    const find = await this.find(id);

    return Boolean(find);
  }

  public async findMany(id: number[]) {
    const data = await db
      .select()
      .from(CategorySchema)
      .where(inArray(CategorySchema.id, id));

    return data;
  }
}
