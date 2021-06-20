import {injectable, unmanaged} from 'inversify';
import {EntitySchema, FindOneOptions, getRepository, Repository} from 'typeorm';
import NotFoundException from '../../../Shared/Exceptions/NotFoundException';
import IByOptions from '../../InterfaceAcapters/IByOptions';
import IBaseRepository from '../../InterfaceAcapters/IBaseRepository';
import IByConditions from '../../InterfaceAcapters/IByConditions';

@injectable()
abstract class BaseSqlRepository<T> implements IBaseRepository<T>
{
    private readonly entityName: string;
    protected repository: Repository<T>;

    protected constructor(@unmanaged() entityName: string, @unmanaged() schema: EntitySchema)
    {
        this.entityName = entityName;
        this.repository = getRepository<T>(schema);
    }

    async save(entity: T): Promise<T>
    {
        return await this.repository.save(entity);
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
        return await this.repository.save(entity);
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

    async getOneBy(condition: IByConditions, options: IByOptions = {initThrow: true}): Promise<T>
    {
        let {initThrow} = options;

        if (typeof initThrow === undefined)
        {
            initThrow = true;
        }

        const entity = await this.repository.findOne(condition);

        if (initThrow && !entity)
        {
            throw new NotFoundException(this.entityName);
        }

        return entity;
    }

    async getBy(condition: IByConditions, options: IByOptions = {initThrow: false}): Promise<T[]>
    {
        let {initThrow} = options;

        if (typeof initThrow === undefined)
        {
            initThrow = false;
        }

        const entities = await this.repository.find(condition);

        if (initThrow && entities.length === 0)
        {
            throw new NotFoundException(this.entityName);
        }

        return entities;
    }

    async exist(condition: IByConditions, select: string[], initThrow = false): Promise<any>
    {
        const conditionMap: FindOneOptions = {
            select,
            where: condition,
            loadEagerRelations: false
        };

        const exist = await this.repository.findOne(conditionMap);

        if (initThrow && !exist)
        {
            throw new NotFoundException(this.entityName);
        }

        return exist;
    }
}

export default BaseSqlRepository;
