import IItemDomain from './IItemDomain';
import Base from '../../../Shared/Domain/Entities/Base';
import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';
import ItemRepPayload from '../Payloads/ItemRepPayload';

class Item extends Base implements IItemDomain
{
    name: string;
    type: number;
    createdBy: IUserDomain;
    lastModifiedBy: IUserDomain;

    constructor(payload: ItemRepPayload)
    {
        super();
        this.updateBuild(payload);
    }

    updateBuild(payload: ItemRepPayload): void
    {
        this.name = payload?.name;
        this.type = payload?.type;
    }

    getCreatedBy(): IUserDomain
    {
        return this.createdBy;
    }

    getLastModifiedBy(): IUserDomain
    {
        return this.lastModifiedBy;
    }
}

export default Item;
