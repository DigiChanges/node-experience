import ICriteria from "../../Lib/Contracts/ICriteria";
import IPaginator from "../../Lib/Contracts/IPaginator";

interface IBaseRepository {
    save(element: any): any;
    update(element: any): any;
    findOne(id: string): any;
    list(criteria: ICriteria): Promise<IPaginator>;
    delete(id: string): any;
}

export default IBaseRepository;