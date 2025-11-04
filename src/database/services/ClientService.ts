import { Client } from '../interfaces/entities/Client';
import { IService } from '../interfaces/IService';
import { ClientModel } from '../interfaces/models/ClientModel';
import { ClientRepository } from '../repositories/ClientRepository';

export class ClientService
  implements IService<ClientModel, number, Client, ClientRepository>
{
  public repository: ClientRepository;

  constructor() {
    this.repository = new ClientRepository();
  }

  public create(data: ClientModel) {
    return this.repository.create(data);
  }

  public delete(id: number) {
    return this.repository.delete(id);
  }

  public update(id: number, data: ClientModel) {
    return this.repository.update(id, data);
  }

  public findAll() {
    return this.repository.findAll();
  }

  public find(id: number) {
    return this.repository.find(id);
  }

  public findMany(id: number[]) {
    return this.repository.findMany(id);
  }
}
