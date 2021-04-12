import * as express from 'express';
import RoleUpdatePayload from '../../../../InterfaceAdapters/Payloads/Roles/RoleUpdatePayload';
import {IsArray, IsBoolean, IsOptional, IsString} from 'class-validator';
import IdRequest from '../Defaults/IdRequest';

class RoleUpdateRequest extends IdRequest implements RoleUpdatePayload
{
    @IsString()
    name: string;

    @IsString()
    slug: string;

    @IsArray()
    @IsString({
        each: true
    })
    permissions: string[];

    @IsOptional()
    @IsBoolean()
    enable: boolean;

    constructor(request: express.Request)
    {
        super(request);
        this.name = request.body.name;
        this.slug = request.body.slug;
        this.permissions = request.body.permissions;
        this.enable = request.body?.enable ?? true;
    }

    getName(): string
    {
        return this.name;
    }

    getSlug(): string
    {
        return this.slug;
    }

    getPermissions(): string[]
    {
        return this.permissions;
    }

    getEnable(): boolean
    {
        return this.enable;
    }

    getId(): string
    {
        return this.id;
    }
}

export default RoleUpdateRequest;
