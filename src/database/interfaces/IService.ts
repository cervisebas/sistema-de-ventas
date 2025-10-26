export interface IService<M extends object, K, R> {
  repository: R;
  create(data: M): Promise<void>;
  delete(id: K): Promise<void>;
  update(id: K, data: M): Promise<void>;
  findAll(): Promise<M[]>;
  find(id: K): Promise<M>;
}
