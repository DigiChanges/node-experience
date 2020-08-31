import RoleRepPayload from "../../../../InterfaceAdapters/Payloads/Roles/RoleRepPayload";
import {IsArray, IsBoolean, IsOptional, IsString} from "class-validator";

class RoleCommandRepRequest implements RoleRepPayload
{
    @IsString()
    name: string;

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

    constructor(env: any)
    {
        this.name = env.role;
        this.slug = env.role.toLowerCase();
        this.permissions = [];
        this.enable = true;
    }

    getName(): string
    {
        return this.name
    }

    getSlug(): string
    {
        return this.slug;
    }

    getEnable(): boolean
    {
        return this.enable
    }

    getPermissions(): any[]
    {
        return [];
    }
}

export default RoleCommandRepRequest;