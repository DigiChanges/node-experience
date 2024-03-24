import * as mongoose from 'mongoose';

import IItemRepository from '../../Domain/Repositories/IItemRepository';
import ItemFilter from '../../Presentation/Criterias/ItemFilter';

import BaseMongooseRepository from '../../../Main/Infrastructure/Repositories/BaseMongooseRepository';
import IItemDomain from '../../Domain/Entities/IItemDomain';
import Item from '../../Domain/Entities/Item';
import { ItemMongooseDocument } from '../Schemas/ItemMongoose';
import { ICriteria } from '../../../Main/Domain/Criteria';

class ItemMongooseRepository extends BaseMongooseRepository<IItemDomain, ItemMongooseDocument> implements IItemRepository
{
    constructor()
    {
        super(Item.name);
    }

    async list(criteria: ICriteria): Promise<any>
    {
        const queryBuilder: mongoose.Query<ItemMongooseDocument[], ItemMongooseDocument> = this.repository.find();
        const filter = criteria.getFilter();

        if (filter.has(ItemFilter.TYPE))
        {
            const type = filter.get(ItemFilter.TYPE);
            void queryBuilder.where(ItemFilter.TYPE).equals(type);
        }

        if (filter.has(ItemFilter.NAME))
        {
            const name: string = filter.get(ItemFilter.NAME) as string;
            const rSearch = new RegExp(name, 'g');

            void queryBuilder.where(ItemFilter.NAME).regex(rSearch);
        }

        return this.pagination(queryBuilder, criteria);
    }
}

export default ItemMongooseRepository;
