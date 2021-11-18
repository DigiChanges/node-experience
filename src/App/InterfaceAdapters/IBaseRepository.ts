import * as DGC from '@digichanges/shared-experience';
import IByOptions from './IByOptions';

interface IBaseRepository<T> extends DGC.IBaseRepository<T>
{
    getBy(condition: Record<string, any>, options?: IByOptions): Promise<T[]>;
    getOneBy(condition: Record<string, any>, options?: IByOptions): Promise<T>;
    getInBy(condition: Record<string, string[]>): Promise<T[]>;
    exist(condition: Record<string, any> | Record<string, any>[], select: string[], initThrow: boolean): Promise<any>;
}

export default IBaseRepository;
