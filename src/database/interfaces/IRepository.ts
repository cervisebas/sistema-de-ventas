export interface IRepository<M extends object, K> {
  create(data: M): Promise<void>;
  delete(id: K): Promise<void>;
  update(id: K, data: M): Promise<void>;
  findAll(): Promise<M[]>;
  find(id: K): Promise<M>;
  findMany(id: K[]): Promise<M[]>;
  exist(id: K): Promise<boolean>;
}
