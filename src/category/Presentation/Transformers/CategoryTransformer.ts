import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Transformer from '../../../Shared/Presentation/Shared/Transformer';
import ICategoryDomain from '../../Domain/Entities/CategoryDomain';
import ICategoryTransformer from './ICategoryTransformer';
import UserMinimalDataTransformer from '../../../Auth/Presentation/Transformers/UserMinimalDataTransformer';

class CategoryTransformer extends Transformer
{
    private userTransformer: UserMinimalDataTransformer;

    constructor()
    {
        super();
        this.userTransformer = new UserMinimalDataTransformer();
    }

    public async transform(Category: ICategoryDomain): Promise<ICategoryTransformer>
    {
        const createdBy = Category.createdBy;
        const lastModifiedBy = Category.lastModifiedBy;
        dayjs.extend(utc);

        return {
            id: Category.getId(),
            title: Category.title,
            enable: Category.enable,
            createdBy: createdBy ? await this.userTransformer.handle(createdBy) : null,
            lastModifiedBy: lastModifiedBy ? await this.userTransformer.handle(lastModifiedBy) : null,
            createdAt: dayjs(Category.createdAt).utc().unix(),
            updatedAt: dayjs(Category.updatedAt).utc().unix()
        };
    }
}

export default CategoryTransformer;
