import IFileDomain from "../../InterfaceAdapters/IDomain/IFileDomain";
import { v4 as uuidv4 } from 'uuid';

class File implements IFileDomain
{
    _id: string;
    name: string;
    originalName: string;
    mimeType: string;
    path: string;
    extension: string;
    createdAt: Date;
    updatedAt: Date;

    constructor()
    {
        this._id = uuidv4();
        this.name = this._id;
    }

    getId(): string
    {
        return this._id;
    }
}

export default File;