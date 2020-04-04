import Item from "../../Entities/Item";
import ICriteria from "../../Lib/Contracts/ICriteria";

interface IItemRepository {
    save(item: Item): any;
    update(item: Item): any;
    findOne(id: string): any;
    list(criteria: ICriteria): any;
    delete(id: string): any;
}

export default IItemRepository;