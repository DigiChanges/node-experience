import IItemRepository from "../Contracts/IItemRepository";
import {DeleteResult, getRepository, Repository} from "typeorm";
import Item from "../../Entities/Item";
import {injectable} from "inversify";
import ErrorException from "../../Lib/ErrorException";
import StatusCode from "../../Lib/StatusCode";
import Paginator from "../../Lib/Paginator";
import IPaginator from "../../Lib/Contracts/IPaginator";
import ICriteria from "../../Lib/Contracts/ICriteria";

@injectable()
class ItemRepository implements IItemRepository {
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

        let queryBuilder = await this.repository
                                        .createQueryBuilder("user");

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

export default ItemRepository;