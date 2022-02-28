import { injectable, unmanaged } from 'inversify';
import { EntitySchema, FindOneOptions, getRepository, In, Repository } from 'typeorm';
import NotFoundException from '../../../Shared/Exceptions/NotFoundException';
import IByOptions from '../../InterfaceAdapters/IByOptions';
import IBaseRepository from '../../InterfaceAdapters/IBaseRepository';

@injectable()
abstract class BaseSqlRepository<T> implements IBaseRepository<T>
{
    protected readonly entityName: string;
    protected repository: Repository<T>;

    constructor(@unmanaged() entityName: string, @unmanaged() schema: EntitySchema)
    {
        this.entityName = entityName;
        this.repository = getRepository<T>(schema);
    }

    async save(entity: T): Promise<T>
    {
        return await this.repository.save(entity as any);
    }

    async getOne(id: string): Promise<T>
    {
        const entity = await this.repository.findOne(id);

        if (!entity)
        {
            throw new NotFoundException(this.entityName);
        }

        return entity;
    }

    async update(entity: T): Promise<T>
    {
        return await this.repository.save(entity as any);
    }

    async delete(id: string): Promise<T>
    {
        const entity = await this.repository.findOne(id);

        if (!entity)
        {
            throw new NotFoundException(this.entityName);
        }

        await this.repository.delete(id);

        return entity;
    }

    async getOneBy(condition: Record<string, any>, options: IByOptions = {}): Promise<T>
    {
        const { initThrow = true } = options;

        const entity = await this.repository.findOne(condition);

        if (initThrow && !entity)
        {
            throw new NotFoundException(this.entityName);
        }

        return entity;
    }

    async getBy(condition: Record<string, any>, options: IByOptions = { initThrow: false }): Promise<T[]>
    {
        let { initThrow } = options;

        initThrow = initThrow ?? false;

        const entities = await this.repository.find(condition);

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

export default BaseSqlRepository;
