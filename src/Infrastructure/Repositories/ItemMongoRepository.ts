import {DocumentQuery, Model} from "mongoose";
import {ObjectID} from "mongodb";
import {injectable} from "inversify";



import ErrorException from "../../Application/Shared/ErrorException";
import IItemRepository from "../../InterfaceAdapters/IRepositories/IItemRepository";
import IPaginator from "../../InterfaceAdapters/Shared/IPaginator";
import ICriteria from "../../InterfaceAdapters/Shared/ICriteria";

import StatusCode from "../../Presentation/Shared/StatusCode";
import ItemFilter from "../../Presentation/Criterias/Item/ItemFilter";
import MongoPaginator from "../../Presentation/Shared/MongoPaginator";
import IItem from "../../InterfaceAdapters/IEntities/Mongoose/IItemDocument";
import ItemSchema from "../Schema/Item";
import IItemDomain from "../../InterfaceAdapters/IDomain/IItemDomain";
import {connection} from "../Database/MongooseCreateConnection";

@injectable()
class ItemMongoRepository implements IItemRepository
{
    private readonly repository: Model<IItem>;

    constructor()
    {
        this.repository = connection.model<IItem>('Item', ItemSchema);
    }

    async save (item: IItemDomain): Promise<IItemDomain>
    {
        return await this.repository.create(item);
    }

    async getOne(id: ObjectID): Promise<IItemDomain>
    {
        try
        {
            const item = await this.repository.findOne(id);

            if (!item)
            {
                throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'Item Not Found');
            }

            return item;
        }
        catch(e)
        {
            throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'Item Not Found');
        }
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: DocumentQuery<IItem[], IItem> = this.repository.find();
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

    async delete(id: ObjectID): Promise<IItemDomain>
    {
        try
        {
            const item = await this.repository.findByIdAndDelete(id);

            if (!item)
            {
                throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'Item Not Found');
            }

            return item;
        }
        catch(e)
        {
            throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'Item Not Found');
        }
    }

}

export default ItemMongoRepository;