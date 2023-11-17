import RedisCacheRepository from '../Repositories/RedisCacheRepository';
import ICacheRepository from '../Repositories/ICacheRepository';
import { CacheConfig } from '../../../Config/MainConfig';

class CacheFactory
{
    static createRedisCache(config: CacheConfig): ICacheRepository
    {
        return RedisCacheRepository.getInstance(config);
    }
}

export default CacheFactory;
