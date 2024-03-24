import { EntityRepository, EntitySchema, FindOneOptions } from '@mikro-orm/postgresql';
import IByOptions from '../../Domain/Repositories/IByOptions';
import IBaseRepository from '../../Domain/Repositories/IBaseRepository';
import EntityMikroORMManagerFactory from '../Factories/EntityMikroORMManagerFactory';
import { NotFoundException } from '../../Domain/Exceptions/NotFoundException';
import { ICriteria } from '../../Domain/Criteria';
import { IPaginator } from '../../Domain/Criteria/IPaginator';

abstract class BaseMikroORMRepository<T extends object> implements IBaseRepository<T>
{
    protected readonly entityName: string;
    protected repository: EntityRepository<any>;
    protected em = EntityMikroORMManagerFactory.getEntityFactory();
    protected populate: string[];

    protected constructor(entityName: string, entitySchema: EntitySchema, populate: string[] = [])
    {
        this.entityName = entityName;
        this.repository = this.em.getRepository(entitySchema);
        this.populate = populate;
    }

    async save(entity: T): Promise<T>
    {
        await this.repository.getEntityManager().persistAndFlush(entity);
        return entity;
    }

    async getOne(id: string): Promise<T>
    {
        const options = { populate: this.populate };
        const entity = await this.repository.findOne(id, (options as any));

        if (!entity)
        {
            throw new NotFoundException(this.entityName);
        }

        return entity;
    }

    async update(entity: T): Promise<T>
    {
        await this.repository.getEntityManager().persistAndFlush(entity);
        return entity;
    }

    async delete(id: string): Promise<T>
    {
        const options = { populate: this.populate };
        const entity = await this.repository.findOne(id, (options as any));

        if (!entity)
        {
            throw new NotFoundException(this.entityName);
        }

        await this.repository.getEntityManager().removeAndFlush(entity);

        return entity;
    }

    async getOneBy(condition: Record<string, any>, options: IByOptions = { initThrow: true, populate: [] }): Promise<T | null>
    {
        const { initThrow, populate } = options;

        const entity = await this.repository.findOne(condition, ({ populate } as FindOneOptions<T>));

        if (initThrow && !entity)
        {
            throw new NotFoundException(this.entityName);
        }

        return entity;
    }

    async getBy(condition: Record<string, any>, options: IByOptions = { initThrow: false, populate: [] }): Promise<T[]>
    {
        const { initThrow, populate } = options;

        const entities = await this.repository.find(condition, { populate } as any);

        if (initThrow && entities.length === 0)
        {
            throw new NotFoundException(this.entityName);
        }

        return entities;
    }

    async getInBy(condition: Record<string, string[]>): Promise<T[]>
    {
        const queryBuilder = this.em.createQueryBuilder<T>(this.entityName, 'i');
        const [key] = Object.keys(condition);

        return await queryBuilder
            .where({ [key]: { $in: condition[key] } })
            .andWhere('1 = 1')
            .getResultList();
    }

    async exist(condition: Record<string, any> | Record<string, any>[], select: string[], initThrow = false): Promise<any>
    {
        const exist = await this.repository.findOne(condition);

        if (initThrow && !exist)
        {
            throw new NotFoundException(this.entityName);
        }

        return exist;
    }

    abstract list(criteria: ICriteria): Promise<IPaginator>;
}

export default BaseMikroORMRepository;
