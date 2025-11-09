import { ClientService } from '../services/ClientService';

export class ClientController {
  public service: ClientService;

  constructor() {
    this.service = new ClientService();
  }

  public create(name: string, email: string | null, phone: string | null) {
    return this.service.create({
      name: name,
      email: email,
      phone: phone,
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
      name: name,
      email: email,
      phone: phone,
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
