import IItemDomain from './IItemDomain';
import { Base } from '@digichanges/shared-experience';

class Item extends Base implements IItemDomain
{
    name: string;
    type: number;
}

export default Item;
