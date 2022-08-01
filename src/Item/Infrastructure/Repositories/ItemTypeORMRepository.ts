import IItemRepository from './IItemRepository';
import Item from '../../Domain/Entities/Item';
import { injectable } from 'inversify';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

import TypeORMPaginator from '../../../Shared/Infrastructure/Orm/TypeORMPaginator';
import ItemFilter from '../../Presentation/Criterias/ItemFilter';
import ItemSchema from '../Schemas/ItemTypeORM';

import BaseTypeORMRepository from '../../../Shared/Infrastructure/Repositories/BaseTypeORMRepository';

@injectable()
class ItemTypeORMRepository extends BaseTypeORMRepository<Item> implements IItemRepository
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
            const type = filter.get(ItemFilter.TYPE);

            queryBuilder.andWhere(`i.${ItemFilter.TYPE} = :${ItemFilter.TYPE}`);
            queryBuilder.setParameter(ItemFilter.TYPE, type);
        }

        if (filter.has(ItemFilter.NAME))
        {
            const name = filter.get(ItemFilter.NAME);

            queryBuilder.andWhere(`i.${ItemFilter.NAME} ilike :${ItemFilter.NAME}`);
            queryBuilder.setParameter(ItemFilter.NAME, `%${name}%`);
        }

        queryBuilder.leftJoinAndSelect('i.createdBy', 'createdBy');
        queryBuilder.leftJoinAndSelect('i.lastModifiedBy', 'lastModifiedBy');

        return new TypeORMPaginator(queryBuilder, criteria);
    }
}

export default ItemTypeORMRepository;
