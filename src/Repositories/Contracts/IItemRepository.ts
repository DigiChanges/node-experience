import Item from "../../Entities/Item";

interface IItemRepository {
    save(item: Item): any;
    update(item: Item): any;
    findOne(id: string): any;
    list(): any;
    delete(id: string): any;
}

export default IItemRepository;