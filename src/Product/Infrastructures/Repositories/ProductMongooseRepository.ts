
import { Query } from 'mongoose';
import IProductDomain from '../../../Product/Domain/Entities/IProductDomain';
import Product from '../../../Product/Domain/Entities/Product';
import ProductFilter from '../../../Product/Presentation/Criterias/ProductFilter';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import MongoosePaginator from '../../../Shared/Infrastructure/Orm/MongoosePaginator';
import BaseMongooseRepository from '../../../Shared/Infrastructure/Repositories/BaseMongooseRepository';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import { ProductMongooseDocument } from '../Schemas/ProductMongoose';
import IProductRepository from './IProductRepository';


class ProductMongooseRepository extends BaseMongooseRepository<IProductDomain, ProductMongooseDocument> implements IProductRepository
{
    constructor()
    {
        super(Product.name, ['createdBy', 'lastModifiedBy']);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<ProductMongooseDocument[], ProductMongooseDocument> = this.repository.find();

        // list if category is enable -> true
        void queryBuilder.populate('category', { enable: true });

        const filter = criteria.getFilter();


        if (filter.has(ProductFilter.TITLE))
        {
            const title: string = filter.get(ProductFilter.TITLE) as string;
            const rSearch = new RegExp(title, 'g');

            void queryBuilder.where(ProductFilter.TITLE).regex(rSearch);
        }


        return new MongoosePaginator(queryBuilder, criteria);
    }

    async getOneCategoryEnable(payload: IdPayload): Promise<IProductDomain>
    {
        const queryBuilder: Query<ProductMongooseDocument[], ProductMongooseDocument> = this.repository.find({ id: payload.id });


        // show if category is enable -> true
        return void queryBuilder.populate('category', { enable: true });
    }
}


export default ProductMongooseRepository;
