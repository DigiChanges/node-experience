import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Transformer from '../../../Shared/Presentation/Shared/Transformer';
import ICategoryDomain from '../../Domain/Entities/ICategoryDomain';
import ICategoryTransformer from './ICategoryTransformer';

class CategoryTransformer extends Transformer
{
    constructor()
    {
        super();
    }

    public async transform(Category: ICategoryDomain): Promise<ICategoryTransformer>
    {
        dayjs.extend(utc);

        return {
            id: Category.getId(),
            title: Category.title,
            enable: Category.enable,

            createdAt: dayjs(Category.createdAt).utc().unix(),
            updatedAt: dayjs(Category.updatedAt).utc().unix()
        };
    }
}

export default CategoryTransformer;
