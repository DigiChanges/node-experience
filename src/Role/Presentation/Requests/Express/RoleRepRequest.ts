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

    get_name(): string
    {
        return this.name;
    }

    get_slug(): string
    {
        return this.slug;
    }

    get_permissions(): string[]
    {
        return this.permissions;
    }

    get_enable(): boolean
    {
        return this.enable;
    }
}

export default RoleRepRequest;
