import {Model} from 'mongoose';
import {Document} from 'mongoose';
import {injectable, unmanaged} from 'inversify';
import {connection} from '../../../Shared/Database/MongooseCreateConnection';
import NotFoundException from '../../../Shared/Exceptions/NotFoundException';
import IByOptions from '../../InterfaceAcapters/IByOptions';
import IBaseRepository from '../../InterfaceAcapters/IBaseRepository';
import IBaseDomain from '../../InterfaceAcapters/IBaseDomain';

@injectable()
abstract class BaseMongoRepository<T extends IBaseDomain, D extends Document & T> implements IBaseRepository<T>
{
    private readonly entityName: string;
    protected repository: Model<D>;

    protected constructor(@unmanaged() entityName: string)
    {
        this.entityName = entityName;
        this.repository = connection.model<D>(entityName);
    }

    async save(entity: T): Promise<T>
    {
        return await this.repository.create(entity);
    }

    async getOne(id: string): Promise<T>
    {
        const entity = await this.repository.findOne({_id: id} as any);

        if (!entity)
        {
            throw new NotFoundException(this.entityName);
        }

        return entity;
    }

    async update(entity: T): Promise<T>
    {
        return this.repository.findByIdAndUpdate({_id: entity.getId()}, entity as any);
    }

    async delete(id: string): Promise<T>
    {
        const entity = await this.repository.findByIdAndDelete({_id: id} as any);

        if (!entity)
        {
            throw new NotFoundException(this.entityName);
        }

        return entity;
    }

    async getOneBy(conditions: {}, options: IByOptions = {initThrow: true, populate: null}): Promise<T>
    {
        let {initThrow, populate} = options;

        if (typeof initThrow === undefined)
        {
            initThrow = true;
        }

        if (typeof populate === undefined)
        {
            populate = null;
        }

        const entity = await this.repository.findOne(conditions).populate(populate).exec();

        if (initThrow && !entity)
        {
            throw new NotFoundException(this.entityName);
        }

        return entity;
    }

    async getBy(conditions: {}, options: IByOptions = {initThrow: false, populate: null}): Promise<T[]>
    {
        let {initThrow, populate} = options;

        if (typeof initThrow === undefined)
        {
            initThrow = false;
        }

        if (typeof populate === undefined)
        {
            populate = null;
        }

        const entities = await this.repository.find(conditions).populate(populate).exec();

        if (initThrow && entities.length === 0)
        {
            throw new NotFoundException(this.entityName);
        }

        return entities;
    }

    async exist(condition: {}, select: string[], initThrow = false): Promise<any>
    {
        const exist = await this.repository.findOne(condition, select.join(' '));

        if (initThrow && !exist)
        {
            throw new NotFoundException(this.entityName);
        }

        return exist;
    }
}

export default BaseMongoRepository;
