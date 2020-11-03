import IPaginator from "../Shared/IPaginator";
import ICriteria from "../Shared/ICriteria";

interface INotificationRepository
{
    save(element: any): Promise<any>;
    getOne(id: string): Promise<any>;
    list(criteria: ICriteria): Promise<IPaginator>;
}

export default INotificationRepository;