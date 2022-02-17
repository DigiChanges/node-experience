import RedisCacheRepository from '../../App/Infrastructure/Repositories/RedisCacheRepository';
import { ICacheRepository } from '@digichanges/shared-experience';

class CacheFactory
{
    static createRedisCache(): ICacheRepository
    {
        return RedisCacheRepository.getInstance();
    }
}

export default CacheFactory;
