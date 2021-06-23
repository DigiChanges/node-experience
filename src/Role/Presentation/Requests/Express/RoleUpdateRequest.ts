import RoleUpdatePayload from '../../../InterfaceAdapters/Payloads/RoleUpdatePayload';
import {IsArray, IsBoolean, IsOptional, IsString} from 'class-validator';
import IdRequest from '../../../../App/Presentation/Requests/Express/IdRequest';

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

    constructor(data: Record<string, any>, id: string)
    {
        super(id);
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

    getId(): string
    {
        return this.id;
    }
}

export default RoleUpdateRequest;
