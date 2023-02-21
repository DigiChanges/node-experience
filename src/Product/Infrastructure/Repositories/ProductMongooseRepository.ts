
import { Query } from 'mongoose';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import IProductRepository from './IProductRepository';
import ProductFilter from '../../Presentation/Criterias/ProductFilter';
import MongoosePaginator from '../../../Shared/Infrastructure/Orm/MongoosePaginator';
import BaseMongooseRepository from '../../../Shared/Infrastructure/Repositories/BaseMongooseRepository';
import IProductDomain from '../../Domain/Entities/IProductDomain';
import Product from '../../Domain/Entities/Product';
import { ProductMongooseDocument } from '../Schemas/ProductMongoose';


class ProductMongooseRepository extends BaseMongooseRepository<IProductDomain, ProductMongooseDocument> implements IProductRepository
{
    constructor()
    {
        super(Product.name, ['createdBy', 'lastModifiedBy']);
    }
    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<ProductMongooseDocument[], ProductMongooseDocument> = this.repository.find();


        void queryBuilder.populate('category', { enable : true });

        const filter = criteria.getFilter();

        if (filter.has(ProductFilter.PRICE))
        {
            const type = filter.get(ProductFilter.PRICE);

            void queryBuilder.where(ProductFilter.PRICE).equals(type);
        }

        if (filter.has(ProductFilter.TITLE))
        {
            const name: string = filter.get(ProductFilter.TITLE) as string;
            const rSearch = new RegExp(name, 'g');

            void queryBuilder.where(ProductFilter.TITLE).regex(rSearch);
        }

        return new MongoosePaginator(queryBuilder, criteria);
    }
}

export default ProductMongooseRepository;
