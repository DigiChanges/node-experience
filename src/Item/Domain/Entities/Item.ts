import IItemDomain from './IItemDomain';
import { Base } from '@digichanges/shared-experience';

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
