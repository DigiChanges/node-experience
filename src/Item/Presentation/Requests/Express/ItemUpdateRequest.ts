import * as express from 'express';
import ItemUpdatePayload from '../../../InterfaceAdapters/Payloads/ItemUpdatePayload';
import {IsInt, IsString} from 'class-validator';
import IdRequest from '../../../../App/Presentation/Requests/Express/IdRequest';

class ItemUpdateRequest extends IdRequest implements ItemUpdatePayload
{
    @IsString()
    name: string;

    @IsInt()
    type: number;

    constructor(request: express.Request)
    {
        super(request);
        this.name = request.body.name;
        this.type = request.body.type;
    }

    getName(): string
    {
        return this.name;
    }

    getType(): number
    {
        return this.type;
    }
}

export default ItemUpdateRequest;
