import { ProductService } from '../services/ProductService';

export class ProductController {
  public service: ProductService;

  constructor() {
    this.service = new ProductService();
  }

  public create(
    name: string,
    price: number,
    description: string | null,
    id_category: number,
    expire: Date | null,
  ) {
    return this.service.create({
      name: name,
      price: price,
      description: description,
      id_category: id_category,
      expire: expire,
    });
  }

  public delete(id: number) {
    return this.service.delete(id);
  }

  public update(
    id: number,
    name: string,
    price: number,
    description: string | null,
    id_category: number,
    expire: Date | null,
  ) {
    return this.service.update(id, {
      name: name,
      price: price,
      description: description,
      id_category: id_category,
      expire: expire,
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
