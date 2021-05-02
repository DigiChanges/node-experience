import * as express from 'express';
import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import {IsUUID} from 'class-validator';

class IdRequest implements IdPayload
{
    @IsUUID('4')
    id: string;

    constructor(request: express.Request)
    {
        this.id = request.params.id;
    }

    getId(): string
    {
        return this.id;
    }
}

export default IdRequest;
