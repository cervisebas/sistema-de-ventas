import { GetDataError } from '../errors/GetDataError';
import { Category } from '../interfaces/entities/Category';
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
  private categories?: Category[];

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

  private async getAllCategories() {
    try {
      this.categories = await this.categoryRepository.findAll();
    } catch (error) {
      console.error(error);
      throw new GetDataError(ProductService, error);
    }
  }

  public async makeObject(data: ProductModel) {
    return {
      ...(data as unknown as Product),
      category: this.categories?.find((val) => val.id === data.id_category)!,
    };
  }

  public makeObjects(data: ProductModel[]) {
    return Promise.all(data.map((value) => this.makeObject(value)));
  }

  public async findAll() {
    const [data] = await Promise.all([
      this.repository.findAll(),
      this.getAllCategories(),
    ]);

    return this.makeObjects(data);
  }

  public async find(id: number) {
    const [data] = await Promise.all([
      this.repository.find(id),
      this.getAllCategories(),
    ]);

    return this.makeObject(data);
  }

  public async findMany(id: number[]) {
    const [data] = await Promise.all([
      this.repository.findMany(id),
      this.getAllCategories(),
    ]);

    return this.makeObjects(data);
  }
}
