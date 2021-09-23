import RoleRepPayload from '../../../InterfaceAdapters/Payloads/RoleRepPayload';
import { IsArray, IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { decorate } from 'ts-mixer';

class RoleRepRequest implements RoleRepPayload
{
    @decorate(Length(3, 30))
    @decorate(IsString())
    name: string;

    @decorate(Length(3, 30))
    @decorate(IsString())
    slug: string;

    @decorate(IsArray())
    @decorate(IsString({
        each: true
    }))
    permissions: string[];

    @decorate(IsOptional())
    @decorate(IsBoolean())
    enable: boolean;

    constructor(data: Record<string, any>)
    {
        this.name = data.name;
        this.slug = data.slug;
        this.permissions = data.permissions;
        this.enable = data.enable ?? true;
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
