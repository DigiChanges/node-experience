import { Query } from 'mongoose';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

import ICategoryRepository from './ICategoryRepository';
import CategoryFilter from '../../Presentation/Criterias/CategoryFilter';
import MongoosePaginator from '../../../Shared/Infrastructure/Orm/MongoosePaginator';

import BaseMongooseRepository from '../../../Shared/Infrastructure/Repositories/BaseMongooseRepository';
import ICategoryDomain from '../../Domain/Entities/ICategoryDomain';
import Category from '../../Domain/Entities/Category';
import { CategoryMongooseDocument } from '../Schemas/CategoryMongoose';

class CategoryMongooseRepository extends BaseMongooseRepository<ICategoryDomain, CategoryMongooseDocument> implements ICategoryRepository
{
    constructor()
    {
        super(Category.name);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<CategoryMongooseDocument[], CategoryMongooseDocument> = this.repository.find();
        const filter = criteria.getFilter();

        if (filter.has(CategoryFilter.ENABLE))
        {
            const type = filter.get(CategoryFilter.ENABLE);

            void queryBuilder.where(CategoryFilter.ENABLE).equals(type);
        }

        if (filter.has(CategoryFilter.TITLE))
        {
            const name: string = filter.get(CategoryFilter.TITLE) as string;
            const rSearch = new RegExp(name, 'g');

            void queryBuilder.where(CategoryFilter.TITLE).regex(rSearch);
        }

        return new MongoosePaginator(queryBuilder, criteria);
    }
}

export default CategoryMongooseRepository;
