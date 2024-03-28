import { QueryBuilder } from '@mikro-orm/postgresql';

import IItemRepository from '../../Domain/Repositories/IItemRepository';
import Item from '../../Domain/Entities/Item';

import ItemFilter from '../../Presentation/Criterias/ItemFilter';
import ItemSchema from '../Schemas/ItemMikroORM';

import BaseMikroORMRepository from '../../../Main/Infrastructure/Repositories/BaseMikroORMRepository';
import IItemDomain from '../../Domain/Entities/IItemDomain';
import { ICriteria } from '../../../Main/Domain/Criteria';

class ItemMikroORMRepository extends BaseMikroORMRepository<IItemDomain> implements IItemRepository
{
    constructor()
    {
        super(Item.name, ItemSchema);
    }

    async list(criteria: ICriteria): Promise<any>
    {
        const queryBuilder: QueryBuilder = this.em.createQueryBuilder('Item', 'i');

        const filter = criteria.getFilter();

        void queryBuilder.where('1 = 1');

        if (filter.has(ItemFilter.TYPE))
        {
            void queryBuilder.andWhere(`i.${ItemFilter.TYPE} = ?`, [`${filter.get(ItemFilter.TYPE) as string}`]);
        }
        if (filter.has(ItemFilter.NAME))
        {
            void queryBuilder.andWhere(`i.${ItemFilter.NAME} like ?`, [`${filter.get(ItemFilter.NAME) as string}`]);
        }
        return this.pagination(queryBuilder, criteria);
    }
}

export default ItemMikroORMRepository;
