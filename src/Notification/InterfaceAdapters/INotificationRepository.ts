import { ICriteria, IPaginator } from '@digichanges/shared-experience';

interface INotificationRepository<T>
{
    save(element: T): Promise<T>;
    getOne(id: string): Promise<T>;
    list(criteria: ICriteria): Promise<IPaginator>;
}

export default INotificationRepository;
