import { ICriteria } from '../../../Main/Domain/Criteria';
import { IPaginator } from '../../../Main/Domain/Criteria/IPaginator';

interface INotificationRepository<T>
{
    save(element: T): Promise<T>;
    getOne(id: string): Promise<T>;
    list(criteria: ICriteria): Promise<IPaginator>;
}

export default INotificationRepository;
