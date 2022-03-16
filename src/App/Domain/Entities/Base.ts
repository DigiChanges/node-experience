import { v4 as uuidV4 } from 'uuid';
import IBaseDomain from '../../../App/InterfaceAdapters/IBaseDomain';

abstract class Base implements IBaseDomain
{
    _id: string;

    createdAt: Date;
    updatedAt: Date;

    constructor()
    {
        this._id = uuidV4();
    }

    getId(): string
    {
        return this._id;
    }

    setId(id: string)
    {
        this._id = id;
    }

    clone(): void
    {
        this._id = uuidV4();
    }
}

export default Base;
