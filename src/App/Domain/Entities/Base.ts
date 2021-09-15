import IBaseDomain from '../../InterfaceAcapters/IBaseDomain';
import {v4 as uuidv4} from 'uuid';

abstract class Base implements IBaseDomain
{
    _id?: string | any;

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