import IByOptions from './IByOptions';

interface IBaseRepository<T>
{
    save(entity: T): Promise<T>;
    update(entity: T): Promise<T>;
    getOne(id: string): Promise<T>;
    delete(id: string): Promise<T>;
    getBy(condition: {}, options?: IByOptions): Promise<T[]>;
    getOneBy(condition: {}, options?: IByOptions): Promise<T>;
    exist(condition: {}, select: string[], initThrow: boolean): Promise<any>
}

export default IBaseRepository;
