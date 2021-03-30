import * as express from 'express';
import RoleRepPayload from '../../../../InterfaceAdapters/Payloads/Roles/RoleRepPayload';
import {IsArray, IsBoolean, IsOptional, IsString, Length} from 'class-validator';

class RoleRepRequest implements RoleRepPayload
{
    @Length(3, 30)
    @IsString()
    name: string;

    @Length(3, 30)
    @IsString()
    slug: string;

    @IsArray()
    @IsString({
        each: true,
    })
    permissions: string[];

    @IsOptional()
    @IsBoolean()
    enable: boolean;

    constructor(request: express.Request)
    {
        this.name = request.body.name;
        this.slug = request.body.slug;
        this.permissions = request.body.permissions;
        this.enable = request.body.hasOwnProperty('enable') ? request.body.enable : true;
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
}

export default RoleRepRequest;
