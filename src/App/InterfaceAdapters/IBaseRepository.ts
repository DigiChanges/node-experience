import IByOptions from './IByOptions';

interface IBaseRepository<T>
{
    save(entity: T): Promise<T>;
    update(entity: T): Promise<T>;
    get_one(id: string): Promise<T>;
    delete(id: string): Promise<T>;
    get_by(condition: Record<string, any>, options?: IByOptions): Promise<T[]>;
    get_one_by(condition: Record<string, any>, options?: IByOptions): Promise<T>;
    get_in_by(condition: Record<string, string[]>): Promise<T[]>;
    exist(condition: Record<string, any> | Record<string, any>[], select: string[], initThrow: boolean): Promise<any>;
}

export default IBaseRepository;
