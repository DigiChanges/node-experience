import { Tedis } from "tedis";
import ICacheRepository from "../../InterfaceAdapters/IRepositories/ICacheRepository";

class RedisCacheRepository implements ICacheRepository
{
    private redis: Tedis;
    private static instance: RedisCacheRepository;

    async createConnection(config: {})
    {
        this.redis = new Tedis(config);
    }

    static getInstance(): RedisCacheRepository
    {
        if (!RedisCacheRepository.instance) {
            RedisCacheRepository.instance = new RedisCacheRepository();
        }

        return RedisCacheRepository.instance;
    }

    async set(key: string, value: string, expires: number = null): Promise<any>
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

    async get(key: string): Promise<string | number>
    {
        return await this.redis.get(key);
    }

    async hset(key: string, value: {}): Promise<any>
    {
        await this.redis.hmset(key, value);
    }

    async hget(key: string, field: string | null = null): Promise<{}>
    {
        let value: {};

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
        await this.redis.command("FLUSHALL");
    }
}

export default RedisCacheRepository;