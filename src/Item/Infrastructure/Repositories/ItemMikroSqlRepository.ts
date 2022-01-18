import IItemRepository from '../../InterfaceAdapters/IItemRepository';
import Item from '../../Domain/Entities/Item';
import { injectable } from 'inversify';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';

import Paginator from '../../../App/Presentation/Shared/MikroPaginator';
import ItemFilter from '../../Presentation/Criterias/ItemFilter';
import ItemSchema from '../Schemas/ItemMikroORM';

import BaseMikroSqlRepository from '../../../App/Infrastructure/Repositories/BaseMikroSqlRepository';
import { QueryBuilder } from '@mikro-orm/postgresql';

@injectable()
class ItemMikroSqlRepository extends BaseMikroSqlRepository<Item> implements IItemRepository
{
    constructor()
    {
        super(Item.name, ItemSchema);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: QueryBuilder = this.em.createQueryBuilder('Item', 'i');

        const filter = criteria.getFilter();

        void queryBuilder.where('1 = 1');

        if (filter.has(ItemFilter.TYPE))
        {
            void queryBuilder.andWhere(`i.${ItemFilter.TYPE} = ?`, [`${filter.get(ItemFilter.TYPE)}`]);
        }
        if (filter.has(ItemFilter.NAME))
        {
            void queryBuilder.andWhere(`i.${ItemFilter.NAME} like ?`, [`${filter.get(ItemFilter.NAME)}`]);
        }

        return new Paginator(queryBuilder, criteria);
    }
}

export default ItemMikroSqlRepository;
