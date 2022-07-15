import RedisCacheRepository from '../../App/Infrastructure/Repositories/RedisCacheRepository';
import ICacheRepository from '../../App/Infrastructure/Repositories/ICacheRepository';

class CacheFactory
{
    static createRedisCache(): ICacheRepository
    {
        return RedisCacheRepository.getInstance();
    }
}

export default CacheFactory;
