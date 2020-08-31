import * as express from "express";
import ItemUpdatePayload from "../../../../InterfaceAdapters/Payloads/Items/ItemUpdatePayload";
import {IsBoolean, IsInt, IsOptional, IsString} from "class-validator";
import IdRequest from "../Defaults/IdRequest";

class ItemUpdateRequest extends IdRequest implements ItemUpdatePayload
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
        super(request);
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

export default ItemUpdateRequest;
