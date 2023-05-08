import ICategoryDomain from '../../Domain/Entities/ICategoryDomain';
import Transformer from '../../../Shared/Presentation/Shared/Transformer';
import ICategoryTransformer from './ICategoryTransformer';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

export class CategoryTransformer extends Transformer
{
    constructor()
    {
        super();
    }

    public async transform(category: ICategoryDomain): Promise<ICategoryTransformer>
    {
        dayjs.extend(utc);

        return {
            id: category.getId(),
            title: category.title,
            enable: category.enable,
            createdAt: dayjs(category.createdAt).utc().unix(),
            updatedAt: dayjs(category.updatedAt).utc().unix()
        };
    }
}

export default CategoryTransformer;
