export interface SaleModel {
  id?: number;
  date: Date;
  price: number;
  discount: number;
  id_client: number | null;
}
