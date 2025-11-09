import { Product } from './Product';
import { Sale } from './Sale';

export interface SaleItem {
  id?: number;
  product: Product;
  sale: Sale;
  price: number;
  quantity: number;
}
