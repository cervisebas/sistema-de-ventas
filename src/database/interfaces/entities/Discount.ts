import { Product } from './Product';

export interface Discount {
  id?: number;
  product: Product;
  startDate: Date;
  endDate: Date;
}
