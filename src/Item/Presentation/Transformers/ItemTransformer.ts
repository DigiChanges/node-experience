import moment from 'moment';
import {Transformer} from '@digichanges/shared-experience';
import IItemTransformer from '../../InterfaceAdapters/IItemTransformer';
import UserMinimalDataTransformer from '../../../User/Presentation/Transformers/UserMinimalDataTransformer';
import Item from '../../Domain/Entities/Item';

class ItemTransformer extends Transformer
{
    private userTransformer: UserMinimalDataTransformer;

    constructor()
    {
        super();
        this.userTransformer = new UserMinimalDataTransformer();
    }

    public transform(item: Item): IItemTransformer
    {
        return {
            id: item.Id,
            name: item.Name,
            type: item.Type,
            createdBy: this.userTransformer.handle(item.CreatedBy),
            lastModifiedBy: this.userTransformer.handle(item.LastModifiedBy),
            createdAt: moment(item.CreatedAt).utc().unix(),
            updatedAt: moment(item.UpdatedAt).utc().unix()
        };
    }
}

export default ItemTransformer;
