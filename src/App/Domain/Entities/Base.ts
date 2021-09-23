import { v4 as uuidv4 } from 'uuid';
import IBaseDomain from '../../../App/InterfaceAdapters/IBaseDomain';

abstract class Base implements IBaseDomain
{
    _id: string;

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

    setId(id: string)
    {
        this._id = id;
    }

    clone(): void
    {
        this._id = uuidv4();
    }
}

export default Base;
