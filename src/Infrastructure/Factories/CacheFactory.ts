import ICacheRepository from "../../InterfaceAdapters/IRepositories/ICacheRepository";
import RedisCacheRepository from "../Repositories/RedisCacheRepository";

class CacheFactory
{
    static createRedisCache(): ICacheRepository
    {
        return RedisCacheRepository.getInstance();
    }
}

export default CacheFactory;