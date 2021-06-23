import IdPayload from '../../../../Shared/InterfaceAdapters/IdPayload';
import {IsUUID} from 'class-validator';

class IdRequest implements IdPayload
{
    @IsUUID('4')
    id: string;

    constructor(id: string)
    {
        this.id = id;
    }

    getId(): string
    {
        return this.id;
    }
}

export default IdRequest;
