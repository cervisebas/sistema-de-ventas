import { Discount } from '../interfaces/entities/Discount';
import { IService } from '../interfaces/IService';
import { DiscountModel } from '../interfaces/models/DiscountModel';
import { DiscountRepository } from '../repositories/DiscountRepository';

export class DiscountService
  implements IService<DiscountModel, number, Discount, DiscountRepository>
{
  public repository: DiscountRepository;

  constructor() {
    this.repository = new DiscountRepository();
  }

  public create(data: DiscountModel) {
    
  }

  public delete(id: number) {
    throw new Error('Method not implemented.');
  }

  public update(id: number, data: DiscountModel) {
    throw new Error('Method not implemented.');
  }

  public findAll() {
    throw new Error('Method not implemented.');
  }

  public find(id: number) {
    throw new Error('Method not implemented.');
  }

  public findMany(id: number[]) {
    throw new Error('Method not implemented.');
  }
}
