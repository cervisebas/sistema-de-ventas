import { GetDataError } from '../errors/GetDataError';
import { Client } from '../interfaces/entities/Client';
import { Sale } from '../interfaces/entities/Sale';
import { IService } from '../interfaces/IService';
import { SaleModel } from '../interfaces/models/SaleModel';
import { SaleRepository } from '../repositories/SaleRepository';
import { ClientService } from './ClientService';

export class SaleService
  implements IService<SaleModel, number, Sale, SaleRepository>
{
  public repository: SaleRepository;
  public clientService: ClientService;
  private clients?: Client[];

  constructor() {
    this.repository = new SaleRepository();
    this.clientService = new ClientService();
  }

  public create(data: SaleModel) {
    return this.repository.create(data);
  }

  public delete(id: number) {
    return this.repository.delete(id);
  }

  public update(id: number, data: SaleModel) {
    return this.repository.update(id, data);
  }

  private async getAllClients() {
    try {
      this.clients = await this.clientService.findAll();
    } catch (error) {
      if (error instanceof GetDataError) {
        throw error;
      }

      throw new GetDataError(SaleService, error);
    }
  }

  public async makeObject(data: SaleModel) {
    return {
      ...(data as unknown as Sale),
      product: this.clients?.find((val) => val.id === data.id_client)!,
    };
  }

  public makeObjects(data: SaleModel[]) {
    return Promise.all(data.map((value) => this.makeObject(value)));
  }

  public async findAll() {
    const [data] = await Promise.all([
      this.repository.findAll(),
      this.getAllClients(),
    ]);

    return this.makeObjects(data);
  }

  public async find(id: number) {
    const [data] = await Promise.all([
      this.repository.find(id),
      this.getAllClients(),
    ]);

    return this.makeObject(data);
  }

  public async findMany(id: number[]) {
    const [data] = await Promise.all([
      this.repository.findMany(id),
      this.getAllClients(),
    ]);

    return this.makeObjects(data);
  }
}
