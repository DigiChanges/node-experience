import IItemDomain from './IItemDomain';
import Base from '../../../Shared/Domain/Entities/Base';
import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';

class Item extends Base implements IItemDomain
{
    name: string;
    type: number;
    createdBy: IUserDomain;
    lastModifiedBy: IUserDomain;

    constructor()
    {
        super();
    }
}

export default Item;
