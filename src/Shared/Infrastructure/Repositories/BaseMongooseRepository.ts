import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
import { connection } from '../Database/CreateMongooseConnection';
import NotFoundException from '../../Exceptions/NotFoundException';
import IByOptions from './IByOptions';
import IBaseRepository from './IBaseRepository';
import IBaseDomain from '../../Domain/Entities/IBaseDomain';

abstract class BaseMongooseRepository<T extends IBaseDomain, D extends Document & T> implements IBaseRepository<T>
{
    protected readonly entityName: string;
    protected repository: Model<D>;
    protected populate: string[];

    constructor(entityName: string, populate: string[] = [])
    {
        this.entityName = entityName;
        this.repository = connection.model<D>(entityName);
        this.populate = populate;
    }

    async save(entity: T): Promise<T>
    {
        return await this.repository.create(entity);
    }

    async getOne(id: string): Promise<T>
    {
        const entity = await this.repository.findOne({ _id: id } as FilterQuery<T>).populate(this.populate);

        if (!entity)
        {
            throw new NotFoundException(this.entityName);
        }

        return entity as any;
    }

    async update(entity: T): Promise<T>
    {
        return this.repository.findOneAndUpdate({ _id: entity.getId() } as FilterQuery<T>, { $set: entity } as UpdateQuery<T>, { new: true }).populate(this.populate  as string | string[]) as any;
    }

    async delete(id: string): Promise<T>
    {
        const entity = await this.repository.findByIdAndDelete({ _id: id } as any).populate(this.populate);

        if (!entity)
        {
            throw new NotFoundException(this.entityName);
        }

        return entity as any;
    }

    async getOneBy(condition: Record<string, any>, options: IByOptions = { initThrow: true, populate: undefined }): Promise<T | null>
    {
        const entity = await this.repository.findOne(condition as FilterQuery<T>).populate(options?.populate as string | string[]).exec();

        if (options?.initThrow && !entity)
        {
            throw new NotFoundException(this.entityName);
        }

        return entity as any;
    }

    async getBy(condition: Record<string, any>, options: IByOptions = { initThrow: false, populate: undefined }): Promise<T[]>
    {
        const entities = await this.repository.find(condition as FilterQuery<T>).populate(options?.populate as string | string[]).exec();

        if (options?.initThrow && entities.length === 0)
        {
            throw new NotFoundException(this.entityName);
        }

        return entities;
    }

    async getInBy(condition: Record<string, string[]>): Promise<T[]>
    {
        const [key] = Object.keys(condition);

        return await this.getBy({ [key]: { $in: condition[key] } });
    }

    async exist(condition: Record<string, any>, select: string[], initThrow = false): Promise<any>
    {
        const exist = await this.repository.findOne(condition as FilterQuery<T>, select.join(' '));

        if (initThrow && !exist)
        {
            throw new NotFoundException(this.entityName);
        }

        return exist;
    }
}

export default BaseMongooseRepository;
