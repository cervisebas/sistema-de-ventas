import { Category } from './Category';

export interface Product {
  id?: number;
  name: string;
  price: number;
  description: string | null;
  category: Category;
  expire: Date | null;
}
