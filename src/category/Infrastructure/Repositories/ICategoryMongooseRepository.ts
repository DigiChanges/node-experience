import { Query } from 'mongoose';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

import ICategoryRepository from './ICategoryRepository';
import MongoosePaginator from '../../../Shared/Infrastructure/Orm/MongoosePaginator';

import BaseMongooseRepository from '../../../Shared/Infrastructure/Repositories/BaseMongooseRepository';
import ICategoryDomain from '../../Domain/Entities/CategoryDomain';
import Category from '../../Domain/Entities/Category';
import { CategoryMongooseDocument } from '../Schemas/ICategoryMongoose';

class CategoryMongooseRepository extends BaseMongooseRepository<ICategoryDomain, CategoryMongooseDocument> implements ICategoryRepository
{
    constructor()
    {
        super(Category.name, ['createdBy', 'lastModifiedBy']);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<CategoryMongooseDocument[], CategoryMongooseDocument> = this.repository.find();

        return new MongoosePaginator(queryBuilder, criteria);
    }
}

export default CategoryMongooseRepository;
