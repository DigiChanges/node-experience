import { EntitySchema, FindOneOptions, In, ObjectLiteral, Repository } from 'typeorm';
import NotFoundException from '../../Exceptions/NotFoundException';
import IByOptions from './IByOptions';
import IBaseRepository from './IBaseRepository';
import { dataSource } from '../Database/CreateTypeORMConnection';

abstract class BaseTypeORMRepository<T extends ObjectLiteral> implements IBaseRepository<T>
{
    protected readonly entityName: string;
    protected repository: Repository<T>;

    constructor(entityName: string, schema: EntitySchema)
    {
        this.entityName = entityName;
        this.repository = dataSource.getRepository<T>(schema);
    }

    async save(entity: T): Promise<T>
    {
        return await this.repository.save(entity as any);
    }

    async getOne(id: string): Promise<T>
    {
        const entity = await this.getOneBy({ _id: id });

        if (!entity)
        {
            throw new NotFoundException(this.entityName);
        }

        return entity;
    }

    async update(entity: T): Promise<T>
    {
        return await this.repository.save(entity);
    }

    async delete(id: string): Promise<T>
    {
        const entity = await this.getOneBy({ _id: id });

        if (!entity)
        {
            throw new NotFoundException(this.entityName);
        }

        await this.repository.delete(id);

        return entity;
    }

    async getOneBy(condition: Record<string, any>, options: IByOptions = { initThrow: true }): Promise<T | null>
    {
        const { initThrow } = options;

        const entity = await this.repository.findOneBy(condition as any);

        if (initThrow && !entity)
        {
            throw new NotFoundException(this.entityName);
        }

        return entity;
    }

    async getBy(condition: Record<string, any>, options: IByOptions = { initThrow: false }): Promise<T[]>
    {
        const { initThrow } = options;

        const entities = await this.repository.findBy(condition as any);

        if (initThrow && entities.length === 0)
        {
            throw new NotFoundException(this.entityName);
        }

        return entities;
    }

    async getInBy(condition: Record<string, string[]>): Promise<T[]>
    {
        const [key] = Object.keys(condition);

        return await this.getBy({ [key]: In(condition[key]) });
    }

    async exist(condition: Record<string, any> | Record<string, any>[], select: string[], initThrow = false): Promise<any>
    {
        const conditionMap: FindOneOptions = {
            select,
            where: condition,
            loadEagerRelations: false
        };

        const exist = await this.repository.findOne(conditionMap as FindOneOptions<T>);

        if (initThrow && !exist)
        {
            throw new NotFoundException(this.entityName);
        }

        return exist;
    }
}

export default BaseTypeORMRepository;
