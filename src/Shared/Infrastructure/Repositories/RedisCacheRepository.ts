import { Tedis } from 'tedis';
import ICacheRepository from './ICacheRepository';
import { CacheConfig } from '../../../Config/MainConfig';

class RedisCacheRepository implements ICacheRepository
{
    private redis: Tedis;
    private static instance: RedisCacheRepository;

    constructor(config: CacheConfig)
    {
        this.redis = new Tedis(config);
    }

    static getInstance(config?: CacheConfig): RedisCacheRepository
    {
        if (!config && !RedisCacheRepository.instance)
        {
            throw Error('Config must be exist when instance is undefined'); // TODO: Add exception
        }
        if (config && !RedisCacheRepository.instance)
        {
            RedisCacheRepository.instance = new RedisCacheRepository(config);
        }

        return RedisCacheRepository.instance;
    }

    async set(key: string, value: string, expires?: number): Promise<void>
    {
        if (expires)
        {
            await this.redis.setex(key, expires, value);
        }
        else
        {
            await this.redis.set(key, value);
        }
    }

    async jset(key: string, value: any, expires: number | null = null): Promise<any>
    {
        if (expires)
        {
            await this.redis.setex(key, expires, JSON.stringify(value));
        }
        else
        {
            await this.redis.set(key, JSON.stringify(value));
        }
    }

    async jget(key: string): Promise<any>
    {
        const val: any = await this.redis.get(key);
        return JSON.parse(val);
    }

    async get(key: string): Promise<string | number | null>
    {
        return await this.redis.get(key);
    }

    async hset(key: string, value: any): Promise<any>
    {
        await this.redis.hmset(key, value);
    }

    async hget(key: string, field: string | null = null): Promise<any>
    {
        let value: any;

        if (field)
        {
            value = await this.redis.hget(key, field);
        }
        else
        {
            value = await this.redis.hgetall(key);
        }

        return value;
    }

    async cleanAll(): Promise<any>
    {
        await this.redis.command('FLUSHALL');
    }

    close(): void
    {
        this.redis.close();
    }
}

export default RedisCacheRepository;
