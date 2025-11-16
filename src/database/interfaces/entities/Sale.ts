import { Client } from './Client';
import { SaleItem } from './SaleItem';

export interface Sale {
  id?: number;
  date: Date;
  price: number;
  discount: number;
  client: Client | null;
  items: SaleItem[];
}
