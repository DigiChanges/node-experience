import IItemDomain from "../../InterfaceAdapters/IDomain/IItemDomain";
import { v4 as uuidv4 } from 'uuid';

class Item implements IItemDomain
{
    _id: string;
    name: string;
    type: number;
    createdAt: Date;
    updatedAt: Date;

    constructor()
    {
        this._id = uuidv4();
    }

    getId = (): string =>
    {
        return this._id;
    }
}

export default Item;
