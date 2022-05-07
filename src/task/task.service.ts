import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import * as NodeCache from 'node-cache';
import { Cache } from 'cache-manager';

const cache = new NodeCache({ stdTTL: 15 });

@Injectable()
export class TaskService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getTask(): Promise<any> {
    const keys = await this.cacheManager.store.keys();
    const allData = [];
    for (const key of keys) {
      const data = await this.cacheManager.get(key);
      allData.push(data);
    }
    return allData;
  }
  async createTask(taskDto): Promise<any> {
    let keys = await this.cacheManager.store.keys();
    if (keys.length === 0) {
      keys = [0];
    }
    const id = Math.max(...keys);
    await this.cacheManager.set(
      String(id + 1),
      { ...taskDto, id: id + 1 },
      { ttl: 10000 },
    );
    return { ...taskDto, id: id + 1 };
  }
  async deleteTask(id: number): Promise<any> {
    await this.cacheManager.del(String(id));
    return true;
  }
  async updateTask(taskDto): Promise<any> {
    await this.cacheManager.set(String(taskDto.id), taskDto, { ttl: 10000 });
    return taskDto;
  }
}
