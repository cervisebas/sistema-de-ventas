import { Discount } from '../interfaces/entities/Discount';
import { IController } from '../interfaces/IController';
import { DiscountService } from '../services/DiscountService';

export class DiscountController implements IController<number, Discount> {
  public service: DiscountService;

  constructor() {
    this.service = new DiscountService();
  }

  public create(id_product: number, startDate: Date, endDate: Date) {
    return this.service.create({
      id_product: id_product,
      startDate: startDate,
      endDate: endDate,
    });
  }

  public delete(id: number) {
    return this.service.delete(id);
  }

  public update(
    id: number,
    id_product: number,
    startDate: Date,
    endDate: Date,
  ) {
    return this.service.update(id, {
      id_product: id_product,
      startDate: startDate,
      endDate: endDate,
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
