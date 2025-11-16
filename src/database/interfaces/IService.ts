export interface IService<M extends object, K, E extends object, R> {
  repository: R;
  create(data: M): Promise<void | number>;
  delete(id: K): Promise<void>;
  update(id: K, data: M): Promise<void>;
  findAll(): Promise<E[]>;
  find(id: K): Promise<E>;
  findMany(id: K[]): Promise<E[]>;
  makeObject?(data: M): Promise<E>;
  makeObjects?(data: M[]): Promise<E[]>;
}
