import ICriteria from "../Shared/ICriteria";
import IPaginator from "../Shared/IPaginator";

interface IBaseRepository
{
    save(element: any): Promise<any>;
    update(element: any): Promise<any>;
    getOne(id: any): Promise<any>;
    list(criteria: ICriteria): Promise<IPaginator>;
    delete(id: any): Promise<any>;
}

export default IBaseRepository;