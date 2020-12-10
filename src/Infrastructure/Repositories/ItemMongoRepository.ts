import {Query, Model} from "mongoose";
import {injectable} from "inversify";

import IItemRepository from "../../InterfaceAdapters/IRepositories/IItemRepository";
import IPaginator from "../../InterfaceAdapters/Shared/IPaginator";
import ICriteria from "../../InterfaceAdapters/Shared/ICriteria";

import ItemFilter from "../../Presentation/Criterias/Item/ItemFilter";
import MongoPaginator from "../../Presentation/Shared/MongoPaginator";
import IItem from "../../InterfaceAdapters/IEntities/Mongoose/IItemDocument";
import IItemDomain from "../../InterfaceAdapters/IDomain/IItemDomain";
import {connection} from "../Database/MongooseCreateConnection";

import NotFoundException from "../Exceptions/NotFoundException";

@injectable()
class ItemMongoRepository implements IItemRepository
{
    private readonly repository: Model<IItem>;

    constructor()
    {
        this.repository = connection.model<IItem>('Item');
    }

    async save (item: IItemDomain): Promise<IItemDomain>
    {
        return await this.repository.create(item);
    }

    async getOne(id: string): Promise<IItemDomain>
    {
        const item = await this.repository.findOne({_id: id});

        if (!item)
        {
            throw new NotFoundException('Item');
        }

        return item;
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<IItem[], IItem> = this.repository.find();
        const filter = criteria.getFilter();

        if (filter.has(ItemFilter.TYPE))
        {
            const type = filter.get(ItemFilter.TYPE);

            queryBuilder.where(ItemFilter.TYPE).equals(type);
        }
        if (filter.has(ItemFilter.NAME))
        {
            const name: string = filter.get(ItemFilter.NAME);
            const rsearch = new RegExp(name, "g");

            queryBuilder.where(ItemFilter.NAME).regex(rsearch);
        }

        return new MongoPaginator(queryBuilder, criteria);
    }

    async update(item: IItemDomain): Promise<IItemDomain>
    {
        return this.repository.updateOne({_id: item.getId()}, item);
    }

    async delete(id: string): Promise<IItemDomain>
    {
        const item = await this.repository.findByIdAndDelete({_id: id});

        if (!item)
        {
            throw new NotFoundException('Item');
        }

        return item;
    }

}

export default ItemMongoRepository;
