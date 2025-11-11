export interface IController<K, E extends object> {
  findAll(): Promise<E[]>;
  find(id: K): Promise<E>;
  findMany(id: K[]): Promise<E[]>;
}
