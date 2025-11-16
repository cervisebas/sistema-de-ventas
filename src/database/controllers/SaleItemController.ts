import { SaleItem } from '../interfaces/entities/SaleItem';
import { IController } from '../interfaces/IController';
import { SaleItemService } from '../services/SaleItemService';

export class SaleItemController implements IController<number, SaleItem> {
  public service: SaleItemService;

  constructor() {
    this.service = new SaleItemService();
  }

  public create(
    id_product: number,
    id_sale: number,
    price: number,
    quantity: number,
  ) {
    return this.service.create({
      id_product: id_product,
      id_sale: id_sale,
      price: price,
      quantity: quantity,
    });
  }

  public delete(id: number) {
    return this.service.delete(id);
  }

  public update(
    id: number,
    id_product: number,
    id_sale: number,
    price: number,
    quantity: number,
  ) {
    return this.service.update(id, {
      id_product: id_product,
      id_sale: id_sale,
      price: price,
      quantity: quantity,
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

  public count() {
    return this.service.count();
  }
}
