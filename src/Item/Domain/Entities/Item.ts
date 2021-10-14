import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import Base from '../../../App/Domain/Entities/Base';
import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';

class Item extends Base implements IItemDomain
{
    name: string;
    type: number;
    createdBy: IUserDomain;
    lastModifiedBy: IUserDomain;

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
