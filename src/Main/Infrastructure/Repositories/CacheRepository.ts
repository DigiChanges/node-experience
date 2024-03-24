import crypto from 'crypto';
import IBaseRepository from '../../Domain/Repositories/IBaseRepository';
import ICacheDataAccess from './ICacheDataAccess';
import IByOptions from '../../Domain/Repositories/IByOptions';
import { ICriteria } from '../../Domain/Criteria';
import { IPaginator } from '../../Domain/Criteria/IPaginator';

class CacheRepository<T extends IBaseRepository<unknown>> implements IBaseRepository<any>
{
    readonly #underlyingRepository: T;
    #cache: ICacheDataAccess;

    constructor(underlyingRepository: T, cache: ICacheDataAccess)
    {
        this.#underlyingRepository = underlyingRepository;
        this.#cache = cache;
    }

    async save(element: any): Promise<any>
    {
        return this.#underlyingRepository.save(element);
    }

    async update(element: any): Promise<any>
    {
        return this.#underlyingRepository.update(element);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const pagination = criteria.getPagination();
        const currentUrl = pagination.getCurrentUrl();

        const hash = crypto
            .createHash('md5')
            .update(currentUrl)
            .digest('hex');

        const cachedData = await this.#cache.jget(hash);

        if (cachedData)
        {
            return cachedData;
        }

        const result = await this.#underlyingRepository.list(criteria);
        await this.#cache.jset(hash, result, 2);

        return result;
    }

    getOne(id: string): Promise<any>
    {
        return this.#underlyingRepository.getOne(id);
    }

    delete(id: string): Promise<any>
    {
        return this.#underlyingRepository.delete(id);
    }

    getBy(condition: Record<string, any>, options: IByOptions): Promise<any[]>
    {
        return this.#underlyingRepository.getBy(condition, options);
    }

    getOneBy(condition: Record<string, any>, options: IByOptions): Promise<any>
    {
        return this.#underlyingRepository.getOneBy(condition, options);
    }

    getInBy(condition: Record<string, string[]>): Promise<any[]>
    {
        return this.#underlyingRepository.getInBy(condition);
    }
}

export default CacheRepository;
