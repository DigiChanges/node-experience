import {ICriteria, IPaginator} from '@digichanges/shared-experience';

interface INotificationRepository
{
    save(element: any): Promise<any>;
    getOne(id: string): Promise<any>;
    list(criteria: ICriteria): Promise<IPaginator>;
}

export default INotificationRepository;
