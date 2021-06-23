import RoleRepPayload from '../../../InterfaceAdapters/Payloads/RoleRepPayload';
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
        each: true
    })
    permissions: string[];

    @IsOptional()
    @IsBoolean()
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
