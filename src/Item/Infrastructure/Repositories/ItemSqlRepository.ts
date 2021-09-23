import IItemRepository from '../../InterfaceAdapters/IItemRepository';
import Item from '../../Domain/Entities/Item';
import { injectable } from 'inversify';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';

import Paginator from '../../../App/Presentation/Shared/Paginator';
import ItemFilter from '../../Presentation/Criterias/ItemFilter';
import ItemSchema from '../Schema/ItemTypeORM';

import BaseSqlRepository from '../../../App/Infrastructure/Repositories/BaseSqlRepository';

@injectable()
class ItemSqlRepository extends BaseSqlRepository<Item> implements IItemRepository
{
    constructor()
    {
        super(Item.name, ItemSchema);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder = this.repository.createQueryBuilder('i');

        const filter = criteria.getFilter();

        queryBuilder.where('1 = 1');

        if (filter.has(ItemFilter.TYPE))
        {
            queryBuilder.andWhere(`i.${  ItemFilter.TYPE  } = :${  ItemFilter.TYPE }`);
            queryBuilder.setParameter(ItemFilter.TYPE, filter.get(ItemFilter.TYPE));
        }

        if (filter.has(ItemFilter.NAME))
        {
            queryBuilder.andWhere(`i.${  ItemFilter.NAME  } like :${  ItemFilter.NAME }`);
            queryBuilder.setParameter(ItemFilter.NAME, `%${filter.get(ItemFilter.NAME)}%`);
        }

        return new Paginator(queryBuilder, criteria);
    }
}

export default ItemSqlRepository;
