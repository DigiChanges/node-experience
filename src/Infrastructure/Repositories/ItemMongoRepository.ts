import IItemRepository from "../../InterfaceAdapters/IRepositories/IItemRepository";
import {DeleteResult, getMongoRepository, MongoRepository} from "typeorm";
import Item from "../Entities/Item";
import {injectable} from "inversify";
import ErrorException from "../../Lib/ErrorException";
import StatusCode from "../../Presentation/Shared/StatusCode";
import IPaginator from "../../InterfaceAdapters/Shared/IPaginator";
import ICriteria from "../../InterfaceAdapters/Shared/ICriteria";
import ItemFilter from "../../Presentation/Criterias/Item/ItemFilter";
import MongoPaginator from "../../Presentation/Shared/MongoPaginator";

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
        try {
            const item = await this.repository.findOne(id);

            if (!item) {
                throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'Item Not Found');
            }

            return item;
        } catch(e)
        {
            throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'Item Not Found');
        }
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const count = await this.repository.count();
        let aggregationCursor = await this.repository.aggregate([]);
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
            aggregationCursor.match(filters);
        }

        const paginator = new MongoPaginator(aggregationCursor, criteria, count);

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