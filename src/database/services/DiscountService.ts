import { GetDataError } from '../errors/GetDataError';
import { Discount } from '../interfaces/entities/Discount';
import { Product } from '../interfaces/entities/Product';
import { IService } from '../interfaces/IService';
import { DiscountModel } from '../interfaces/models/DiscountModel';
import { DiscountRepository } from '../repositories/DiscountRepository';
import { ProductService } from './ProductService';

export class DiscountService
  implements IService<DiscountModel, number, Discount, DiscountRepository>
{
  public repository: DiscountRepository;
  public productService: ProductService;
  private products?: Product[];

  constructor() {
    this.repository = new DiscountRepository();
    this.productService = new ProductService();
  }

  public create(data: DiscountModel) {
    return this.repository.create(data);
  }

  public delete(id: number) {
    return this.repository.delete(id);
  }

  public update(id: number, data: DiscountModel) {
    return this.repository.update(id, data);
  }

  private async getAllProducts() {
    try {
      this.products = await this.productService.findAll();
    } catch (error) {
      if (error instanceof GetDataError) {
        throw error;
      }

      throw new GetDataError(DiscountService, error);
    }
  }

  public async makeObject(data: DiscountModel) {
    return {
      ...(data as unknown as Discount),
      product: this.products?.find((val) => val.id === data.id_product)!,
    };
  }

  public makeObjects(data: DiscountModel[]) {
    return Promise.all(data.map((value) => this.makeObject(value)));
  }

  public async findAll() {
    const [data] = await Promise.all([
      this.repository.findAll(),
      this.getAllProducts(),
    ]);

    return this.makeObjects(data);
  }

  public async find(id: number) {
    const [data] = await Promise.all([
      this.repository.find(id),
      this.getAllProducts(),
    ]);

    return this.makeObject(data);
  }

  public async findMany(id: number[]) {
    const [data] = await Promise.all([
      this.repository.findMany(id),
      this.getAllProducts(),
    ]);

    return this.makeObjects(data);
  }

  public count() {
    return this.repository.count();
  }
}
