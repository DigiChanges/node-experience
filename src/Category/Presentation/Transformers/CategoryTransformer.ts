import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Transformer from '../../../Shared/Presentation/Shared/Transformer';
import ICategoryDomain from '../../Domain/Entities/ICategoryDomain';
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

    public async transform(category: ICategoryDomain): Promise<ICategoryTransformer>
    {
        const createdBy = category.createdBy;
        const lastModifiedBy = category.lastModifiedBy;
        dayjs.extend(utc);

        return {
            id: category.getId(),
            title: category.title,
            enable: category.enable,
            createdBy: createdBy ? await this.userTransformer.handle(createdBy) : null,
            lastModifiedBy: lastModifiedBy ? await this.userTransformer.handle(lastModifiedBy) : null,
            createdAt: dayjs(category.createdAt).utc().unix(),
            updatedAt: dayjs(category.updatedAt).utc().unix()
        };
    }
}

export default CategoryTransformer;
