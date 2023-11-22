import * as mongoose from 'mongoose';
import { ICriteria } from '@digichanges/shared-experience';

import IItemRepository from './IItemRepository';
import ItemFilter from '../../Presentation/Criterias/ItemFilter';
import MongoosePaginator from '../../../Main/Infrastructure/Orm/MongoosePaginator';

import BaseMongooseRepository from '../../../Main/Infrastructure/Repositories/BaseMongooseRepository';
import IItemDomain from '../../Domain/Entities/IItemDomain';
import Item from '../../Domain/Entities/Item';
import { ItemMongooseDocument } from '../Schemas/ItemMongoose';
import ResponsePayload from '../../../Shared/Utils/ResponsePayload';
import PaginatorTransformer from '../../../Shared/Utils/PaginatorTransformer';

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

        const paginator = new MongoosePaginator(queryBuilder, criteria);
        const data = await paginator.paginate();
        const metadata = paginator.getMetadata();
        const result = { data, metadata } as ResponsePayload;

        if (paginator.getExist())
        {
            const paginatorTransformer = new PaginatorTransformer();
            const pagination = await paginatorTransformer.handle(paginator);

            Object.assign(result, { pagination });
        }

        return result;
    }
}

export default ItemMongooseRepository;
