import { Category } from '../interfaces/entities/Category';
import { IController } from '../interfaces/IController';
import { CategoryService } from '../services/CategoryService';

export class CategoryController implements IController<number, Category> {
  public service: CategoryService;

  constructor() {
    this.service = new CategoryService();
  }

  public create(name: string) {
    return this.service.create({
      name: name,
    });
  }

  public delete(id: number) {
    return this.service.delete(id);
  }

  public update(id: number, name: string) {
    return this.service.update(id, {
      name: name,
    });
  }

  public findAll() {
    return this.service.findAll();
  }

  public find(id: number) {
    return this.service.find(id);
  }

  public findMany(id: number[]) {
    return this.service.findMany(id);
  }
}
