import IProductRepository from './IProductRepository';

import MongoosePaginator from '../../../Shared/Infrastructure/Orm/MongoosePaginator';
import ProductFilter from '../../Presentation/Criterias/ProductFilter';
import IProduct from '../Schemas/ProductMongooseDocument';
import { Query } from 'mongoose';
import IProductDomain from '../../Domain/Entities/IProductDomain';

import BaseMongooseRepository from '../../../Shared/Infrastructure/Repositories/BaseMongooseRepository';
import Product from '../../Domain/Entities/Product';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

class ProductMongooseRepository extends BaseMongooseRepository<IProductDomain, IProduct> implements IProductRepository
{
    constructor()
    {
        super(Product.name);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<IProduct[], IProduct> = this.repository.find({});
        const filter = criteria.getFilter();

        if (filter.has(ProductFilter.ACTIVE))
        {
            const _active = filter.get(ProductFilter.ACTIVE);
            const active: boolean = _active !== 'false';

            void queryBuilder.where(ProductFilter.ACTIVE).equals(active);
        }

        if (filter.has(ProductFilter.TITLE))
        {
            const title = filter.get(ProductFilter.TITLE) as string;
            const rSearch = new RegExp(title, 'g');

            void queryBuilder.where(ProductFilter.TITLE).regex(rSearch);
        }

        return new MongoosePaginator(queryBuilder, criteria);
    }
}

export default ProductMongooseRepository;
