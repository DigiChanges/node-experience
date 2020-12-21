import * as express from "express";
import ItemRepPayload from "../../../../InterfaceAdapters/Payloads/Items/ItemRepPayload";
import {IsInt, IsString} from "class-validator";

class ItemRepRequest implements ItemRepPayload
{
    @IsString()
    name: string;

    @IsInt()
    type: number;

    constructor(request: express.Request)
    {
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

export default ItemRepRequest;
