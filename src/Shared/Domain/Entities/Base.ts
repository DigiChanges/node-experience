import { UUID, uuid } from '@deepkit/type';
import IBaseDomain from './IBaseDomain';

abstract class Base implements IBaseDomain
{
    _id: UUID;

    createdAt: Date;
    updatedAt: Date;

    constructor()
    {
        this._id = uuid();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    getId(): string
    {
        return this._id;
    }

    setId(id: UUID)
    {
        this._id = id;
    }
}

export default Base;
