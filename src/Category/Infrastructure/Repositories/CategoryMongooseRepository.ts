import Category from 'Category/Domain/Entitites/Category';
import ICategoryDomain from 'Category/Domain/Entitites/ICategoryDomain';
import CategoryFilter from 'Category/Presentation/Criterias/CategoryFilter';
import { Query } from 'mongoose';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import MongoosePaginator from '../../../Shared/Infrastructure/Orm/MongoosePaginator';
import BaseMongooseRepository from '../../../Shared/Infrastructure/Repositories/BaseMongooseRepository';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import { CategoryMongooseDocument } from '../Schemas/CategoryMongoose';
import ICategoryRepository from './ICategoryRepository';

class CategoryMongooseRepository
  extends BaseMongooseRepository<ICategoryDomain, CategoryMongooseDocument>
  implements ICategoryRepository
{
  constructor() {
    super(Category.name, ['createdBy', 'lastModifiedBy']);
  }

  async list(criteria: ICriteria): Promise<IPaginator> {
    const queryBuilder: Query<
      CategoryMongooseDocument[],
      CategoryMongooseDocument
    > = this.repository.find();
    const filter = criteria.getFilter();

    if (filter.has(CategoryFilter.TITLE)) {
      const title: string = filter.get(CategoryFilter.TITLE) as string;
      const rSearch = new RegExp(title, 'g');

      void queryBuilder.where(CategoryFilter.TITLE).regex(rSearch);
    }

    void queryBuilder.populate(this.populate);

    return new MongoosePaginator(queryBuilder, criteria);
  }
}

export default CategoryMongooseRepository;
