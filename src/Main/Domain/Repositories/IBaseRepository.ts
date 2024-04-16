import IByOptions from './IByOptions';
import { ICriteria } from '../Criteria';
import ResponsePayload from '../../../Shared/Utils/ResponsePayload';

interface IBaseRepository<T>
{
    save(element: T): Promise<T>;
    update(element: T): Promise<T>;
    getOne(id: string): Promise<T>;
    delete(id: string): Promise<T>;
    getBy(condition: Record<string, any>, options: IByOptions): Promise<T[]>;

    getOneBy(condition: Record<string, any>, options: IByOptions): Promise<T | null>;
    getInBy(condition: Record<string, string[]>): Promise<T[]>;

    list(criteria: ICriteria): Promise<ResponsePayload<T>>;
}

export default IBaseRepository;
