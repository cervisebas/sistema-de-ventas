import { eq, inArray, not } from 'drizzle-orm';
import { db } from '../database';
import { IRepository } from '../interfaces/IRepository';
import { ClientModel } from '../interfaces/models/ClientModel';
import { ClientSchema } from '../schemas/ClientSchema';

export class ClientRepository implements IRepository<ClientModel, number> {
  public async create(data: ClientModel) {
    await db.insert(ClientSchema).values(data);
  }

  public async delete(id: number) {
    await db
      .update(ClientSchema)
      .set({
        delete: true,
      })
      .where(eq(ClientSchema.id, id));
  }

  public async update(id: number, data: ClientModel) {
    await db.update(ClientSchema).set(data).where(eq(ClientSchema.id, id));
  }

  public async findAll() {
    const data = await db
      .select()
      .from(ClientSchema)
      .where(not(eq(ClientSchema.delete, true)));

    return data;
  }

  public async find(id: number) {
    const data = await db
      .select()
      .from(ClientSchema)
      .where(eq(ClientSchema.id, id));

    return data[0];
  }

  public async exist(id: number) {
    const find = await this.find(id);

    return Boolean(find);
  }

  public async findMany(id: number[]) {
    const data = await db
      .select()
      .from(ClientSchema)
      .where(inArray(ClientSchema.id, id));

    return data;
  }
}
