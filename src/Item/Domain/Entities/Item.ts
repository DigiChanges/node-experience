import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import Base from '../../../App/Domain/Entities/Base';
import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';

class Item extends Base implements IItemDomain
{
    private name: string;
    private type: number;
    private createdBy: IUserDomain;
    private lastModifiedBy: IUserDomain;

    getName(): string
    {
        return this.name;
    }

    setName(name: string): void
    {
        this.name = name;
    }

    getType(): number
    {
        return this.type;
    }

    setType(type: number): void
    {
        this.type = type;
    }

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
