import ICriteria from "../../Lib/Contracts/ICriteria";

interface IBaseRepository {
    save(element: any): any;
    update(element: any): any;
    findOne(id: string): any;
    list(criteria: ICriteria): any;
    delete(id: string): any;
}

export default IBaseRepository;