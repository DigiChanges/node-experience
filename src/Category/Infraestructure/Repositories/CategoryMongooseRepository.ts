import ICategoryDomain from '../../Domain/Entities/ICategoryDomain';
import BaseMongooseRepository from '../../../Shared/Infrastructure/Repositories/BaseMongooseRepository';
import { CategoryMongooseDocument } from '../Schemas/CategoryMongoose';
import Category from '../../Domain/Entities/Category';
import ICategoryRepository from './ICategoryRepository';

class CategoryMongooseRepository extends BaseMongooseRepository<ICategoryDomain, CategoryMongooseDocument> implements ICategoryRepository
{
    constructor()
    {
        super(Category.name);
    }

    async list(): Promise<ICategoryDomain[]>
    {
        const data = await this.repository.find();
        return data;
    }
}

export default CategoryMongooseRepository;
