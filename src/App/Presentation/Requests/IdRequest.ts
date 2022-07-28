import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import { IsUUID } from 'class-validator';
import { decorate } from 'ts-mixer';

class IdRequest implements IdPayload
{
    protected _id: string;

    constructor(data: Record<string, any>)
    {
        this._id = data.id;
    }

    @decorate(IsUUID('4'))
    get id(): string
    {
        return this._id;
    }
}

export default IdRequest;
