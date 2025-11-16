import { GetDataError } from '../errors/GetDataError';
import { Product } from '../interfaces/entities/Product';
import { SaleItem } from '../interfaces/entities/SaleItem';
import { IService } from '../interfaces/IService';
import { SaleItemModel } from '../interfaces/models/SaleItemModel';
import { SaleItemRepository } from '../repositories/SaleItemRepository';
import { ProductService } from './ProductService';

export class SaleItemService
  implements IService<SaleItemModel, number, SaleItem, SaleItemRepository>
{
  public repository: SaleItemRepository;
  public productService: ProductService;
  private products?: Product[];

  constructor() {
    this.repository = new SaleItemRepository();
    this.productService = new ProductService();
  }

  public create(data: SaleItemModel) {
    console.log(data);
    return this.repository.create(data);
  }

  public delete(id: number) {
    return this.repository.delete(id);
  }

  public update(id: number, data: SaleItemModel) {
    return this.repository.update(id, data);
  }

  private async getAllProducts() {
    try {
      this.products = await this.productService.findAll();
    } catch (error) {
      if (error instanceof GetDataError) {
        throw error;
      }

      throw new GetDataError(SaleItemService, error);
    }
  }

  public async makeObject(data: SaleItemModel) {
    return {
      ...(data as unknown as SaleItem),
      product: this.products?.find((val) => val.id === data.id_product)!,
    };
  }

  public makeObjects(data: SaleItemModel[]) {
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

  public async findBySale(sale_id: number) {
    const [data] = await Promise.all([
      this.repository.findBySale(sale_id),
      this.getAllProducts(),
    ]);

    return this.makeObjects(data);
  }
}
