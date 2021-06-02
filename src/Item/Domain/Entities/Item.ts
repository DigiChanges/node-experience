import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import Base from '../../../App/Domain/Entities/Base';

class Item extends Base implements IItemDomain
{
    name: string;
    type: number;
}

export default Item;
