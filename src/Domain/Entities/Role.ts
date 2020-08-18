import {ObjectID} from "mongodb";
import IRoleDomain from "../../InterfaceAdapters/IDomain/IRoleDomain";

class Role implements IRoleDomain
{
    _id: ObjectID;
    name: string;
    slug: string;
    enable: boolean;
    permissions: string[];
    createdAt: Date;
    updatedAt: Date;

    getId(): ObjectID
    {
        return this._id;
    }
}

export default Role;