import { Injectable, Inject, CACHE_MANAGER } from "@nestjs/common";
import { Cache } from "cache-manager";
import { ICacheMemory } from "../../../interface-adapters/interfaces/cache/cache-memory.interface";

@Injectable()
export class RedisCacheService implements ICacheMemory {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get(key: string): Promise<unknown> {
    return this.cache.get(key);
  }

  async set(key: string, value: any, ttl = 3600): Promise<void> {
    await this.cache.set(key, value, ttl);
  }

  async remove(key: string): Promise<void> {
    await this.cache.del(key);
  }

  async removeAllKeysByPrefix(prefix: string): Promise<void> {
    const keys = await this.cache.store.keys!();

    for (const key of keys) {
      const foundKeyByPrefix = key.includes(prefix);

      if (foundKeyByPrefix) {
        await this.remove(key);
      }
    }
  }
}
