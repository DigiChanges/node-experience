import IRoleDomain from "../../InterfaceAdapters/IDomain/IRoleDomain";
import { v4 as uuidv4 } from 'uuid';

class Role implements IRoleDomain
{
    _id: string;
    name: string;
    slug: string;
    enable: boolean;
    permissions: string[];
    createdAt: Date;
    updatedAt: Date;

    constructor()
    {
        this._id = uuidv4();
    }

    getId(): string
    {
        return this._id;
    }
}

export default Role;
