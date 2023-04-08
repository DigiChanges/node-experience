import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Transformer from '../../../Shared/Presentation/Shared/Transformer';
import IItemDomain from '../../Domain/Entities/IItemDomain';
import IItemTransformer from './IItemTransformer';

class ItemTransformer extends Transformer
{
    constructor()
    {
        super();
    }

    public async transform(item: IItemDomain): Promise<IItemTransformer>
    {
        dayjs.extend(utc);

        return {
            id: item.getId(),
            name: item.name,
            type: item.type,
            createdAt: dayjs(item.createdAt).utc().unix(),
            updatedAt: dayjs(item.updatedAt).utc().unix()
        };
    }
}

export default ItemTransformer;
