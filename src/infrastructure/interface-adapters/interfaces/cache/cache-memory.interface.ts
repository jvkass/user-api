export interface ICacheMemory {
  get(key: string): Promise<any>;
  set(key: string, value: any, ttl?: number): Promise<void>;
  remove(key: string): Promise<void>;
  removeAllKeysByPrefix(prefix: string): Promise<void>;
}
