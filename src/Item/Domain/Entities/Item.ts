import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import Base from '../../../App/Domain/Entities/Base';
import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';

class Item extends Base implements IItemDomain
{
    name: string;
    type: number;
    created_by: IUserDomain;
    last_modified_by: IUserDomain;

    get_created_by(): IUserDomain
    {
        return this.created_by;
    }

    get_last_modified_by(): IUserDomain
    {
        return this.last_modified_by;
    }
}

export default Item;
