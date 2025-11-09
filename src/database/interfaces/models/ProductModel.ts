export interface ProductModel {
  id?: number;
  name: string;
  price: number;
  description: string | null;
  id_category: number;
  expire: Date | null;
}
