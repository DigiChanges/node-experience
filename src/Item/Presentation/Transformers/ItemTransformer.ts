import moment from 'moment';
import { Transformer } from '@digichanges/shared-experience';

import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import IItemTransformer from '../../InterfaceAdapters/IItemTransformer';
import UserMinimalDataTransformer from '../../../User/Presentation/Transformers/UserMinimalDataTransformer';

class ItemTransformer extends Transformer
{
    private userTransformer: UserMinimalDataTransformer;

    constructor()
    {
        super();
        this.userTransformer = new UserMinimalDataTransformer();
    }

    public transform(item: IItemDomain): IItemTransformer
    {
        return {
            id: item.getId(),
            name: item.name,
            type: item.type,
            createdBy: this.userTransformer.handle(item.getCreatedBy()),
            lastModifiedBy: this.userTransformer.handle(item.getCreatedBy()),
            createdAt: moment(item.createdAt).utc().unix(),
            updatedAt: moment(item.updatedAt).utc().unix()
        };
    }
}

export default ItemTransformer;
