import { Sale } from '../interfaces/entities/Sale';
import { IController } from '../interfaces/IController';
import { SaleService } from '../services/SaleService';

export class SaleController implements IController<number, Sale> {
  public service: SaleService;

  constructor() {
    this.service = new SaleService();
  }

  public create(
    date: Date,
    price: number,
    discount: number,
    id_client: number,
  ) {
    return this.service.create({
      date: date,
      price: price,
      discount: discount,
      id_client: id_client,
    });
  }

  public delete(id: number) {
    return this.service.delete(id);
  }

  public update(
    id: number,
    date: Date,
    price: number,
    discount: number,
    id_client: number,
  ) {
    return this.service.update(id, {
      date: date,
      price: price,
      discount: discount,
      id_client: id_client,
    });
  }

  public async findAll() {
    return this.service.findAll();
  }

  public async find(id: number) {
    return this.service.find(id);
  }

  public async findMany(id: number[]) {
    return this.service.findMany(id);
  }
}
