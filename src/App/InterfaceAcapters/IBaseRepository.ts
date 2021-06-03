import IByOptions from './IByOptions';
import IByConditions from './IByConditions';

interface IBaseRepository<T>
{
    save(entity: T): Promise<T>;
    update(entity: T): Promise<T>;
    getOne(id: string): Promise<T>;
    delete(id: string): Promise<T>;
    getBy(condition: IByConditions, options?: IByOptions): Promise<T[]>;
    getOneBy(condition: IByConditions, options?: IByOptions): Promise<T>;
    exist(condition: IByConditions, select: string[], initThrow: boolean): Promise<any>
}

export default IBaseRepository;
