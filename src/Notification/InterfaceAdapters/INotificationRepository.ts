import { ICriteria, IPaginator } from '@digichanges/shared-experience';

interface INotificationRepository<T>
{
    save(element: T): Promise<T>;
    get_one(id: string): Promise<T>;
    list(criteria: ICriteria): Promise<IPaginator>;
}

export default INotificationRepository;
