import {Document, Model} from 'mongoose';
import {injectable, unmanaged} from 'inversify';
import {connection} from '../../../Shared/Database/MongooseCreateConnection';
import NotFoundException from '../../../Shared/Exceptions/NotFoundException';
import IByOptions from '../../InterfaceAcapters/IByOptions';
import IBaseRepository from '../../InterfaceAcapters/IBaseRepository';
import IBaseDomain from '../../InterfaceAcapters/IBaseDomain';

@injectable()
abstract class BaseMongoRepository<T extends IBaseDomain, D extends Document & T> implements IBaseRepository<T>
{
    protected readonly entityName: string;
    protected repository: Model<D>;
    protected populate: string | string[];

    protected constructor(@unmanaged() entityName: string, @unmanaged() populate: string | string[] = null)
    {
        this.entityName = entityName;
        this.repository = connection.model<D & T>(entityName);
        this.populate = populate;
    }

    async save(entity: T): Promise<T>
    {
        return await this.repository.create(entity);
    }

    async getOne(id: string): Promise<T>
    {
        const entity = await this.repository.findOne({_id: id} as any).populate(this.populate);

        if (!entity)
        {
            throw new NotFoundException(this.entityName);
        }

        return entity;
    }

    async update(entity: T): Promise<T>
    {
        return this.repository.findOneAndUpdate({_id: entity.getId()} as any, {$set: entity} as any, {new: true}).populate(this.populate);
    }

    async delete(id: string): Promise<T>
    {
        const entity = await this.repository.findByIdAndDelete({_id: id} as any).populate(this.populate);

        if (!entity)
        {
            throw new NotFoundException(this.entityName);
        }

        return entity;
    }

    async getOneBy(condition: Record<string, any>, options: IByOptions = {initThrow: true, populate: null}): Promise<T>
    {
        let {initThrow, populate} = options;

        initThrow = initThrow ?? false;
        populate = populate ?? null;

        const entity = await this.repository.findOne(condition as any).populate(populate).exec();

        if (initThrow && !entity)
        {
            throw new NotFoundException(this.entityName);
        }

        return entity;
    }

    async getBy(condition: Record<string, any>, options: IByOptions = {initThrow: false, populate: null}): Promise<T[]>
    {
        let {initThrow, populate} = options;

        initThrow = initThrow ?? false;
        populate = populate ?? null;

        const entities = await this.repository.find(condition as any).populate(populate).exec();

        if (initThrow && entities.length === 0)
        {
            throw new NotFoundException(this.entityName);
        }

        return entities;
    }

    async exist(condition: Record<string, any>, select: string[], initThrow = false): Promise<any>
    {
        const exist = await this.repository.findOne(condition as any, select.join(' '));

        if (initThrow && !exist)
        {
            throw new NotFoundException(this.entityName);
        }

        return exist;
    }
}

export default BaseMongoRepository;
