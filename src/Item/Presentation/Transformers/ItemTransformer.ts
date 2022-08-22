import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Transformer from '../../../Shared/Presentation/Shared/Transformer';
import IItemDomain from '../../Domain/Entities/IItemDomain';
import IItemTransformer from './IItemTransformer';
import UserMinimalDataTransformer from '../../../User/Presentation/Transformers/UserMinimalDataTransformer';

class ItemTransformer extends Transformer
{
    private userTransformer: UserMinimalDataTransformer;

    constructor()
    {
        super();
        this.userTransformer = new UserMinimalDataTransformer();
    }

    public async transform(item: IItemDomain): Promise<IItemTransformer>
    {
        const createdBy = item.getCreatedBy();
        const lastModifiedBy = item.getLastModifiedBy();
        dayjs.extend(utc);

        return {
            id: item.getId(),
            name: item.name,
            type: item.type,
            createdBy: createdBy ? await this.userTransformer.handle(createdBy) : null,
            lastModifiedBy: lastModifiedBy ? await this.userTransformer.handle(lastModifiedBy) : null,
            createdAt: dayjs(item.createdAt).utc().unix(),
            updatedAt: dayjs(item.updatedAt).utc().unix()
        };
    }
}

export default ItemTransformer;
