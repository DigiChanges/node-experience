import ProductFilter from '../../Presentation/Criterias/ProductFilter';
import IProductDomain from '../../Domain/Entities/IProductDomain';
import IProductRepository from './IProductRepository';
import BaseMikroORMRepository from '../../../Shared/Infrastructure/Repositories/BaseMikroORMRepository';
import ProductSchema from '../Schemas/ProductMikroORM';
import { QueryBuilder } from '@mikro-orm/postgresql';
import MikroORMPaginator from '../../../Shared/Infrastructure/Orm/MikroORMPaginator';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

class ProductMikroORMRepository extends BaseMikroORMRepository<IProductDomain> implements IProductRepository
{
    constructor()
    {
        super('Product', ProductSchema);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: QueryBuilder = this.em.createQueryBuilder('Product', 'i');

        const filter = criteria.getFilter();

        void queryBuilder.where('1 = 1');

        if (filter.has(ProductFilter.ACTIVE))
        {
            void queryBuilder.andWhere(`i.${ProductFilter.ACTIVE} = ?`, [`${filter.get(ProductFilter.ACTIVE)}`]);
        }
        if (filter.has(ProductFilter.TITLE))
        {
            void queryBuilder.andWhere(`i.${ProductFilter.TITLE} like ?`, [`%${filter.get(ProductFilter.TITLE)}%`]);
        }

        return new MikroORMPaginator(queryBuilder, criteria);
    }
}

export default ProductMikroORMRepository;
