import { Query } from 'mongoose';
import { injectable } from 'inversify';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';

import IItemRepository from './IItemRepository';
import ItemFilter from '../../Presentation/Criterias/ItemFilter';
import MongoosePaginator from '../../../App/Presentation/Shared/Orm/MongoosePaginator';
import IItem from '../Schemas/IItemDocument';

import BaseMongooseRepository from '../../../App/Infrastructure/Repositories/BaseMongooseRepository';
import IItemDomain from '../../Domain/Entities/IItemDomain';
import Item from '../../Domain/Entities/Item';

@injectable()
class ItemMongooseRepository extends BaseMongooseRepository<IItemDomain, IItem> implements IItemRepository
{
    constructor()
    {
        super(Item.name, ['createdBy', 'lastModifiedBy']);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<IItem[], IItem> = this.repository.find();
        const filter = criteria.getFilter();

        if (filter.has(ItemFilter.TYPE))
        {
            const type = filter.get(ItemFilter.TYPE);

            void queryBuilder.where(ItemFilter.TYPE).equals(type);
        }

        if (filter.has(ItemFilter.NAME))
        {
            const name: string = filter.get(ItemFilter.NAME);
            const rSearch = new RegExp(name, 'g');

            void queryBuilder.where(ItemFilter.NAME).regex(rSearch);
        }

        void queryBuilder.populate(this.populate);

        return new MongoosePaginator(queryBuilder, criteria);
    }
}

export default ItemMongooseRepository;
