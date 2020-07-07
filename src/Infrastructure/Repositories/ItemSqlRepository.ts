import IItemRepository from "../../InterfaceAdapters/IRepositories/IItemRepository";
import {DeleteResult, getRepository, Repository} from "typeorm";
import Item from "../Entities/Item";
import {injectable} from "inversify";
import ErrorException from "../../Application/Shared/ErrorException";
import StatusCode from "../../Presentation/Shared/StatusCode";
import Paginator from "../../Presentation/Shared/Paginator";
import IPaginator from "../../InterfaceAdapters/Shared/IPaginator";
import ICriteria from "../../InterfaceAdapters/Shared/ICriteria";
import ItemFilter from "../../Presentation/Criterias/Item/ItemFilter";

@injectable()
class ItemSqlRepository implements IItemRepository {
    private repository: Repository<Item>;

    constructor() {
        this.repository = getRepository(Item);
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

    async list(criteria: ICriteria): Promise<IPaginator> {

        let queryBuilder = await this.repository.createQueryBuilder("i");

        const filter = criteria.getFilter();

        queryBuilder.where("1 = 1");

        if (filter.has(ItemFilter.ENABLE))
        {
            queryBuilder.andWhere("i." + ItemFilter.ENABLE + " = :" + ItemFilter.ENABLE);
            queryBuilder.setParameter(ItemFilter.ENABLE, filter.get(ItemFilter.ENABLE));
        }
        if (filter.has(ItemFilter.TYPE))
        {
            queryBuilder.andWhere("i." + ItemFilter.TYPE + " = :" + ItemFilter.TYPE);
            queryBuilder.setParameter(ItemFilter.TYPE, filter.get(ItemFilter.TYPE));
        }
        if (filter.has(ItemFilter.NAME))
        {
            queryBuilder.andWhere("i." + ItemFilter.NAME + " like :" + ItemFilter.NAME);
            queryBuilder.setParameter(ItemFilter.NAME, '%' + filter.get(ItemFilter.NAME) + '%');
        }

        const paginator = new Paginator(queryBuilder, criteria);

        return await paginator;
    }

    async update(item: Item): Promise<any> {
        this.repository.save(item);
    }

    async delete(id: string): Promise<DeleteResult> {
        return await this.repository.delete(id);
    }

}

export default ItemSqlRepository;