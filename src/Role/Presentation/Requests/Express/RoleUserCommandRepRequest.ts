import RoleRepPayload from '../../../InterfaceAdapters/Payloads/RoleRepPayload';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

class RoleCommandRepRequest implements RoleRepPayload
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

    constructor(env: any)
    {
        this.name = env.role;
        this.slug = env.role.toLowerCase();
        this.permissions = [];
        this.enable = true;
    }

    get_name(): string
    {
        return this.name;
    }

    get_slug(): string
    {
        return this.slug;
    }

    get_enable(): boolean
    {
        return this.enable;
    }

    get_permissions(): any[]
    {
        return [];
    }
}

export default RoleCommandRepRequest;
