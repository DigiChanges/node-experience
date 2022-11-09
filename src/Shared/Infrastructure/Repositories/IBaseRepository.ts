import IByOptions from './IByOptions';

interface IBaseRepository<T>
{
    save(element: T): Promise<T>;
    update(element: T): Promise<T>;
    getOne(id: string): Promise<T>;
    delete(id: string): Promise<T>;
    getBy(condition: Record<string, any>, options: IByOptions): Promise<T[]>;

    getOneBy(condition: Record<string, any>, options: IByOptions): Promise<T | null>;
    getInBy(condition: Record<string, string[]>): Promise<T[]>;
    exist(condition: Record<string, any> | Record<string, any>[], select: string[], initThrow: boolean): Promise<any>;
}

export default IBaseRepository;
