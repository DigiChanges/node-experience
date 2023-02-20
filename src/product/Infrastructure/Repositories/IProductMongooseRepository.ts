import { Query } from 'mongoose';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

import IProductRepository from './IProductRepository';
import MongoosePaginator from '../../../Shared/Infrastructure/Orm/MongoosePaginator';

import BaseMongooseRepository from '../../../Shared/Infrastructure/Repositories/BaseMongooseRepository';
import IProductDomain from '../../Domain/Entities/IProductDomain';
import Product from '../../Domain/Entities/Product';
import { ProductMongooseDocument } from '../Schemas/IProductMongoose';
import ICategoryRepository from 'category/Infrastructure/Repositories/ICategoryRepository';

class ProductMongooseRepository extends BaseMongooseRepository<IProductDomain, ProductMongooseDocument> implements IProductRepository
{
    constructor(
        private readonly categoryRepository: ICategoryRepository
    )
    {
        super(Product.name, ['createdBy', 'lastModifiedBy']);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<ProductMongooseDocument[], ProductMongooseDocument> = this.repository.find();

        return new MongoosePaginator(queryBuilder, criteria);
    }

    async getAllByCategoryId(id: string): Promise<any>
    {
        const categoryExist = await this.categoryRepository.getOne(id);

        if (!categoryExist || categoryExist.enable === false)
        {
            return [];
        }

        const queryBuilder: Query<ProductMongooseDocument[], ProductMongooseDocument> = this.repository.find({
            category: id
        });

        return new MongoosePaginator(queryBuilder, null);
    }
}

export default ProductMongooseRepository;
