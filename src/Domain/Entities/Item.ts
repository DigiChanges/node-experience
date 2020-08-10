import IItemDomain from "../../InterfaceAdapters/IDomain/IItemDomain";
import { ObjectID } from "mongodb";

class Item implements IItemDomain
{
    _id: ObjectID;
    name: string;
    type: number;
    createdAt: Date;
    updatedAt: Date;

    getId(): ObjectID
    {
        return this._id;
    }
}

export default Item;