import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class CacheService {
  constructor(private readonly redisService: RedisService) {}

  async getValue(key: string): Promise<string | null> {
    const client = await this.redisService.getClient();
    return await client.get(key);
  }

  async setValue(key: string, value: string): Promise<void> {
    const client = await this.redisService.getClient();
    await client.set(key, value);
  }
}
