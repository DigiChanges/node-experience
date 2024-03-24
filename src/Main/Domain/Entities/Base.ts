import { randomUUID } from 'crypto';
import { IBaseDomain } from './IBaseDomain';

export class Base implements IBaseDomain
{
    _id: string;

    createdAt: Date;
    updatedAt: Date;

    constructor()
    {
        this._id = randomUUID();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    getId(): string
    {
        return this._id;
    }

    setId(id: string)
    {
        this._id = id;
    }
}
