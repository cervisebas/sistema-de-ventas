import { Category } from '../interfaces/entities/Category';
import { IService } from '../interfaces/IService';
import { CategoryModel } from '../interfaces/models/CategoryModel';
import { CategoryRepository } from '../repositories/CategoryRepository';

export class CategoryService
  implements IService<CategoryModel, number, Category, CategoryRepository>
{
  public repository: CategoryRepository;

  constructor() {
    this.repository = new CategoryRepository();
  }

  public create(data: CategoryModel) {
    return this.repository.create(data);
  }

  public delete(id: number) {
    return this.repository.delete(id);
  }

  public update(id: number, data: CategoryModel) {
    return this.repository.update(id, data);
  }

  public findAll() {
    return this.repository.findAll();
  }

  public find(id: number) {
    return this.repository.find(id);
  }

  public findMany(id: number[]) {
    return this.repository.findMany(id);
  }
}
