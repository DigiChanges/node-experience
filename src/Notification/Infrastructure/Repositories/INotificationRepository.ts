import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

interface INotificationRepository<T>
{
    save(element: T): Promise<T>;
    getOne(id: string): Promise<T>;
    list(criteria: ICriteria): Promise<IPaginator>;
}

export default INotificationRepository;
