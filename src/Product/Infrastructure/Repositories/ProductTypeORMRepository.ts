import IProductRepository from './IProductRepository';
import Product from '../../Domain/Entities/Product';

import TypeORMPaginator from '../../../Shared/Infrastructure/Orm/TypeORMPaginator';
import ProductFilter from '../../Presentation/Criterias/ProductFilter';
import IProductDomain from '../../Domain/Entities/IProductDomain';
import ProductSchema from '../Schemas/ProductTypeORM';

import BaseTypeORMRepository from '../../../Shared/Infrastructure/Repositories/BaseTypeORMRepository';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';

class ProductTypeORMRepository extends BaseTypeORMRepository<IProductDomain> implements IProductRepository
{
    constructor()
    {
        super(Product.name, ProductSchema);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder = this.repository.createQueryBuilder('i');

        const filter = criteria.getFilter();

        queryBuilder.where('1 = 1');

        if (filter.has(ProductFilter.ACTIVE))
        {
            const _active = filter.get(ProductFilter.ACTIVE);
            const active: boolean = _active !== 'false';

            queryBuilder.andWhere(`i.${ProductFilter.ACTIVE} = :${ProductFilter.ACTIVE}`);
            queryBuilder.setParameter(ProductFilter.ACTIVE, active);
        }

        if (filter.has(ProductFilter.TITLE))
        {
            const title = filter.get(ProductFilter.TITLE);

            queryBuilder.andWhere(`i.${ProductFilter.TITLE} ilike :${ProductFilter.TITLE}`);
            queryBuilder.setParameter(ProductFilter.TITLE, `%${title}%`);
        }

        return new TypeORMPaginator(queryBuilder, criteria);
    }
}

export default ProductTypeORMRepository;
