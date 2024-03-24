import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import IItemDomain from '../../Domain/Entities/IItemDomain';
import IItemTransformer from './IItemTransformer';
import { Transformer } from '../../../Main/Presentation/Transformers';

class ItemTransformer extends Transformer<IItemDomain, IItemTransformer>
{
    public async transform(item: IItemDomain): Promise<IItemTransformer>
    {
        dayjs.extend(utc);

        return {
            id: item._id,
            name: item.name,
            type: item.type,
            createdAt: dayjs(item.createdAt).utc().unix(),
            updatedAt: dayjs(item.updatedAt).utc().unix()
        };
    }
}

export default ItemTransformer;
