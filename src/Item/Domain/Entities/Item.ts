import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import Base from '../../../App/Domain/Entities/Base';
import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';

class Item extends Base implements IItemDomain
{
    name: string;
    type: number;

    protected createdBy: IUserDomain;
    protected lastModifiedBy: IUserDomain;

    getCreatedBy(): IUserDomain
    {
        return this.createdBy;
    }

    setCreatedBy(createdBy: IUserDomain): void
    {
        this.createdBy = createdBy;
    }

    getLastModifiedBy(): IUserDomain
    {
        return this.lastModifiedBy;
    }

    setLastModifiedBy(lastModifiedBy: IUserDomain): void
    {
        this.lastModifiedBy = lastModifiedBy;
    }
}

export default Item;
