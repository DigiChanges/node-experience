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
        const createdBy = item.getCreatedBy();
        const lastModifiedBy = item.getLastModifiedBy();

        return {
            id: item.getId(),
            name: item.name,
            type: item.type,
            createdBy: createdBy ? this.userTransformer.handle(createdBy) : null,
            lastModifiedBy: lastModifiedBy ? this.userTransformer.handle(lastModifiedBy) : null,
            createdAt: moment(item.createdAt).utc().unix(),
            updatedAt: moment(item.updatedAt).utc().unix()
        };
    }
}

export default ItemTransformer;
