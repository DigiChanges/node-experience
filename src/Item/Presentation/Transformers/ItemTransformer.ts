import moment from 'moment';
import {Transformer} from '@digichanges/shared-experience';

import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import IItemTransformer from '../../InterfaceAdapters/IItemTransformer';

class ItemTransformer extends Transformer
{
    public transform(item: IItemDomain): IItemTransformer
    {
        return {
            id: item.getId(),
            name: item.name,
            type: item.type,
            createdAt: moment(item.createdAt).utc().unix(),
            updatedAt: moment(item.updatedAt).utc().unix()
        };
    }
}

export default ItemTransformer;
