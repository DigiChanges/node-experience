import * as express from "express";
import ItemRepPayload from "../../../../InterfaceAdapters/Payloads/Items/ItemRepPayload";
import {IsBoolean, IsInt, IsOptional, IsString} from "class-validator";

class ItemRepRequest implements ItemRepPayload
{
    @IsString()
    name: string;

    @IsInt()
    type: number;

    @IsOptional()
    @IsBoolean()
    enable: boolean;

    constructor(request: express.Request)
    {
        this.name = request.body.name;
        this.type = request.body.type;
        this.enable = request.body.hasOwnProperty('enable') ? request.body.enable : true;
    }

    getName(): string
    {
        return this.name;
    }

    getType(): number
    {
        return this.type;
    }

    getEnable(): boolean
    {
        return this.enable;
    }
}

export default ItemRepRequest;
