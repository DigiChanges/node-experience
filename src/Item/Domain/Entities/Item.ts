import IItemDomain from './IItemDomain';
import Base from '../../../Shared/Domain/Entities/Base';

class Item extends Base implements IItemDomain
{
    name: string;
    type: number;

    constructor()
    {
        super();
    }
}

export default Item;
