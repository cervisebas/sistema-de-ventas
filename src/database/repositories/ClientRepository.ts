import { eq } from 'drizzle-orm';
import { db } from '../database';
import { IRepository } from '../interfaces/IRepository';
import { ClientModel } from '../interfaces/models/ClientModel';
import { ClientSchema } from '../schemas/ClientSchema';

export class ClientRepository implements IRepository<ClientModel, number> {
  public async create(data: ClientModel) {
    await db.insert(ClientSchema).values(data);
  }

  public async delete(id: number) {
    await db.delete(ClientSchema).where(eq(ClientSchema.id, id));
  }

  public async update(id: number, data: ClientModel) {
    await db.update(ClientSchema).set(data).where(eq(ClientSchema.id, id));
  }

  public async findAll() {
    const clients = await db.select().from(ClientSchema);

    return clients;
  }

  public async find(id: number) {
    const client = await db
      .select()
      .from(ClientSchema)
      .where(eq(ClientSchema.id, id));

    return client[0];
  }

  public async exist(id: number) {
    const find = await this.find(id);

    return Boolean(find);
  }
}
