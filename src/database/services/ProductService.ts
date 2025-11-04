import { Product } from '../interfaces/entities/Product';
import { IService } from '../interfaces/IService';
import { ProductModel } from '../interfaces/models/ProductModel';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { ProductRepository } from '../repositories/ProductRepository';

export class ProductService
  implements IService<ProductModel, number, Product, ProductRepository>
{
  public repository: ProductRepository;
  private categoryRepository: CategoryRepository;

  constructor() {
    this.repository = new ProductRepository();
    this.categoryRepository = new CategoryRepository();
  }

  public create(data: ProductModel) {
    return this.repository.create(data);
  }

  public delete(id: number) {
    return this.repository.delete(id);
  }

  public update(id: number, data: ProductModel) {
    return this.repository.update(id, data);
  }

  public makeObjects(data: ProductModel[]) {
    
  }

  public findAll() {
    return this.repository.findAll();
  }

  public find(id: number) {
    return this.repository.find(id);
  }

  public findMany(id: number[]) {
    throw new Error('Method not implemented.');
  }
}
