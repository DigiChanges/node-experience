import RedisCacheRepository from '../Infrastructure/Repositories/RedisCacheRepository';
import ICacheRepository from '../Infrastructure/Repositories/ICacheRepository';
import { CacheConfig } from '../../Config/MainConfig';

class CacheFactory
{
    static createRedisCache(config: CacheConfig): ICacheRepository
    {
        return RedisCacheRepository.getInstance(config);
    }
}

export default CacheFactory;
