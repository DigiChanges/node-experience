import RedisCacheRepository from '../Infrastructure/Repositories/RedisCacheRepository';
import ICacheRepository from '../Infrastructure/Repositories/ICacheRepository';

class CacheFactory
{
    static createRedisCache(): ICacheRepository
    {
        return RedisCacheRepository.getInstance();
    }
}

export default CacheFactory;
