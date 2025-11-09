import { Client } from './Client';

export interface Sale {
  id?: number;
  date: Date;
  price: number;
  discount: number;
  client: Client;
}
