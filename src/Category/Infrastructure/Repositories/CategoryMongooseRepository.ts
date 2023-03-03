import { Query } from 'mongoose';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

import ICategoryRepository from './ICategoryRepository';
import MongoosePaginator from '../../../Shared/Infrastructure/Orm/MongoosePaginator';

import BaseMongooseRepository from '../../../Shared/Infrastructure/Repositories/BaseMongooseRepository';
import ICategoryDomain from '../../Domain/Entities/ICategoryDomain';
import Category from '../../Domain/Entities/Category';
import { CategoryMongooseDocument } from '../Schemas/CategoryMongoose';
import CategoryFilter from '../../Presentation/Criterias/CategoryFilter';

class CategoryMongooseRepository extends BaseMongooseRepository<ICategoryDomain, CategoryMongooseDocument> implements ICategoryRepository
{
    constructor()
    {
        super(Category.name, ['createdBy', 'lastModifiedBy']);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<CategoryMongooseDocument[], CategoryMongooseDocument> = this.repository.find();
        const filter = criteria.getFilter();

        if (filter.has(CategoryFilter.ENABLE))
        {
            const enable = filter.get(CategoryFilter.ENABLE);

            void queryBuilder.where(CategoryFilter.ENABLE).equals(enable);
        }

        if (filter.has(CategoryFilter.TITLE))
        {
            const title: string = filter.get(CategoryFilter.TITLE) as string;
            const rSearch = new RegExp(title, 'g');

            void queryBuilder.where(CategoryFilter.TITLE).regex(rSearch);
        }

        void queryBuilder.populate(this.populate);

        return new MongoosePaginator(queryBuilder, criteria);
    }
}

export default CategoryMongooseRepository;
