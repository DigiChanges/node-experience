import { Query } from 'mongoose';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

import IProductRepository from './IProductRepository';
import MongoosePaginator from '../../../Shared/Infrastructure/Orm/MongoosePaginator';

import BaseMongooseRepository from '../../../Shared/Infrastructure/Repositories/BaseMongooseRepository';
import IProductDomain from '../../Domain/Entities/IProductDomain';
import Product from '../../Domain/Entities/Product';
import { ProductMongooseDocument } from '../Schemas/ProductMongoose';
import ProductFilter from '../../Presentation/Criterias/ProductFilter';

class ProductMongooseRepository extends BaseMongooseRepository<IProductDomain, ProductMongooseDocument> implements IProductRepository
{
    constructor()
    {
        super(Product.name, ['createdBy', 'lastModifiedBy']);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<ProductMongooseDocument[], ProductMongooseDocument> = this.repository.find();
        const filter = criteria.getFilter();

        void queryBuilder.populate('category', { enable : true });
        if (filter.has(ProductFilter.PRICE))
        {
            const price = filter.get(ProductFilter.PRICE);

            void queryBuilder.where(ProductFilter.PRICE).equals(price);
        }

        if (filter.has(ProductFilter.TITLE))
        {
            const title: string = filter.get(ProductFilter.TITLE) as string;
            const rSearch = new RegExp(title, 'g');

            void queryBuilder.where(ProductFilter.TITLE).regex(rSearch);
        }

        return new MongoosePaginator(queryBuilder, criteria);
    }
}

export default ProductMongooseRepository;
