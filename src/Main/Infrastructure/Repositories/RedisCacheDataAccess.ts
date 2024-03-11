import { Tedis } from 'tedis';
import ICacheDataAccess from './ICacheDataAccess';

export type CacheConfig = {
    host: string;
    port: number;
    user: string;
    password: string;
};

class RedisCacheDataAccess implements ICacheDataAccess
{
    #cache: Tedis;

    constructor(config: CacheConfig)
    {
        this.#cache = new Tedis({ ...config, port: +config.port });
    }

    async set(key: string, value: string, expires?: number): Promise<void>
    {
        if (expires)
        {
            await this.#cache.setex(key, expires, value);
        }
        else
        {
            await this.#cache.set(key, value);
        }
    }

    async jset(key: string, value: any, expires: number | null = null): Promise<any>
    {
        if (expires)
        {
            await this.#cache.setex(key, expires, JSON.stringify(value));
        }
        else
        {
            await this.#cache.set(key, JSON.stringify(value));
        }
    }

    async jget(key: string): Promise<any>
    {
        const val: any = await this.#cache.get(key);
        return JSON.parse(val);
    }

    async get(key: string): Promise<string | number | null>
    {
        return await this.#cache.get(key);
    }

    async hset(key: string, value: any): Promise<any>
    {
        await this.#cache.hmset(key, value);
    }

    async hget(key: string, field: string | null = null): Promise<any>
    {
        let value: any;

        if (field)
        {
            value = await this.#cache.hget(key, field);
        }
        else
        {
            value = await this.#cache.hgetall(key);
        }

        return value;
    }

    async cleanAll(): Promise<void>
    {
        await this.#cache.command('FLUSHALL');
    }

    close(): void
    {
        this.#cache.close();
    }
}

export default RedisCacheDataAccess;
