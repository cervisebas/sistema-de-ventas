import { Client } from '../interfaces/entities/Client';
import { IController } from '../interfaces/IController';
import { ClientService } from '../services/ClientService';

export class ClientController implements IController<number, Client> {
  public service: ClientService;

  constructor() {
    this.service = new ClientService();
  }

  public create(name: string, email: string | null, phone: string | null) {
    return this.service.create({
      name: name.trim(),
      email: email?.length ? email.trim() : null,
      phone: phone?.length ? phone.trim() : null,
    });
  }

  public delete(id: number) {
    return this.service.delete(id);
  }

  public update(
    id: number,
    name: string,
    email: string | null,
    phone: string | null,
  ) {
    return this.service.update(id, {
      name: name.trim(),
      email: email?.length ? email.trim() : null,
      phone: phone?.length ? phone.trim() : null,
    });
  }

  public findAll() {
    return this.service.findAll();
  }

  public find(id: number) {
    return this.service.find(id);
  }

  public findMany(id: number[]) {
    return this.service.findMany(id);
  }
}
