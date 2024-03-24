import IItemDomain from './IItemDomain';
import { Base } from '../../../Main/Domain/Entities';

class Item extends Base implements IItemDomain
{
    name: string;
    type: number;
}

export default Item;
