import RedisCacheRepository from '../../../Shared/Infrastructure/Repositories/RedisCacheRepository';
import ICacheRepository from '../../../Shared/Infrastructure/Repositories/ICacheRepository';
import { CacheConfig } from '../../../Config/MainConfig';

class CacheFactory
{
    static createRedisCache(config: CacheConfig): ICacheRepository
    {
        return RedisCacheRepository.getInstance(config);
    }
}

export default CacheFactory;
