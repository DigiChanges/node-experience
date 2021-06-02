import {Query} from 'mongoose';
import {injectable} from 'inversify';
import {ICriteria, IPaginator} from '@digichanges/shared-experience';

import IItemRepository from '../../InterfaceAdapters/IItemRepository';
import ItemFilter from '../../Presentation/Criterias/ItemFilter';
import MongoPaginator from '../../../App/Presentation/Shared/MongoPaginator';
import IItem from '../../InterfaceAdapters/IItemDocument';
import IItemDomain from '../../InterfaceAdapters/IItemDomain';

import BaseMongoRepository from '../../../App/Infrastructure/Repositories/BaseMongoRepository';
import Item from '../../Domain/Entities/Item';

@injectable()
class ItemMongoRepository extends BaseMongoRepository<IItemDomain, IItem> implements IItemRepository
{
    constructor()
    {
        super(Item.name);
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
            const rsearch = new RegExp(name, 'g');

            void queryBuilder.where(ItemFilter.NAME).regex(rsearch);
        }

        return new MongoPaginator(queryBuilder, criteria);
    }
}

export default ItemMongoRepository;
