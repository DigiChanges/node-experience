import IItemRepository from "../Contracts/IItemRepository";
import {DeleteResult, getMongoRepository, MongoRepository} from "typeorm";
import Item from "../../Entities/Item";
import {injectable} from "inversify";
import ErrorException from "../../Lib/ErrorException";
import StatusCode from "../../Lib/StatusCode";
import IPaginator from "../../Lib/Contracts/IPaginator";
import ICriteria from "../../Lib/Contracts/ICriteria";
import ItemFilter from "../../Api/Libs/Criterias/Item/ItemFilter";
import MongoPaginator from "../../Lib/MongoPaginator";

@injectable()
class ItemMongoRepository implements IItemRepository {
    private repository: MongoRepository<Item>;

    constructor() {
        this.repository = getMongoRepository(Item);
    }

    async save (item: Item): Promise<Item> {
        return await this.repository.save(item);
    }

    async findOne(id: string): Promise<Item> {
        const item = await this.repository.findOne(id);

        if (!item) {
            throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'Item Not Found')
        }

        return item;
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const count = await this.repository.count();
        let cursor = await this.repository.createCursor();
        const filter = criteria.getFilter();
        let filters = {};

        if (filter.has(ItemFilter.ENABLE))
        {
            let _enable = filter.get(ItemFilter.ENABLE);
            const enable: boolean = _enable !== 'false';

            Object.assign(filters, {enable: { $eq : enable }});
        }
        if (filter.has(ItemFilter.TYPE))
        {
            let type = filter.get(ItemFilter.TYPE);

            Object.assign(filters, {type: { $eq : type }});
        }
        if (filter.has(ItemFilter.NAME))
        {
            let name = filter.get(ItemFilter.NAME);

            Object.assign(filters, {name: { $regex : name }});
        }

        if (Object.entries(filters))
        {
            cursor.filter(filters);
        }

        const paginator = new MongoPaginator(cursor, criteria, count);

        return await paginator;
    }

    async update(item: Item): Promise<any> {
        this.repository.save(item);
    }

    async delete(id: string): Promise<DeleteResult> {
        return await this.repository.delete(id);
    }

}

export default ItemMongoRepository;