import moment from 'moment';
import { Transformer } from '@digichanges/shared-experience';

import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import IItemTransformer from '../../InterfaceAdapters/IItemTransformer';
import UserMinimalDataTransformer from '../../../User/Presentation/Transformers/UserMinimalDataTransformer';

class ItemTransformer extends Transformer
{
    private user_transformer: UserMinimalDataTransformer;

    constructor()
    {
        super();
        this.user_transformer = new UserMinimalDataTransformer();
    }

    public transform(item: IItemDomain): IItemTransformer
    {
        return {
            id: item.get_id(),
            name: item.name,
            type: item.type,
            created_by: this.user_transformer.handle(item.get_created_by()),
            last_modified_by: this.user_transformer.handle(item.get_created_by()),
            createdAt: moment(item.createdAt).utc().unix(),
            updatedAt: moment(item.updatedAt).utc().unix()
        };
    }
}

export default ItemTransformer;
