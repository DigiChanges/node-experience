import IRoleDomain from '../../../../Role/InterfaceAdapters/IRoleDomain';
import { ArrayMinSize, IsArray, IsBoolean, IsString, Length } from 'class-validator';
import UserSavePayload from '../../../InterfaceAdapters/Payloads/UserSavePayload';

class UserCommandSaveRequest implements UserSavePayload
{
    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsString()
    email: string;

    @Length(3, 10)
    @IsString()
    birthday: string;

    @Length(2, 3)
    @IsString()
    document_type: string;

    @Length(3, 16)
    @IsString()
    document_number: string;

    @Length(1, 20)
    @IsString()
    gender: string;

    @Length(3, 20)
    @IsString()
    phone: string;

    @Length(2, 20)
    @IsString()
    country: string;

    @Length(3, 60)
    @IsString()
    address: string;

    @IsString()
    password: string;

    @IsString()
    password_confirmation: string;

    @IsBoolean()
    enable: boolean;

    @IsArray()
    @ArrayMinSize(0)
    @IsString({
        each: true
    })
    permissions: string[];

    @IsArray()
    roles: IRoleDomain[];

    @IsBoolean()
    is_super_admin: boolean;

    constructor(env: any, role: any = null)
    {
        this.email = env.email;
        this.first_name = env.first_name;
        this.last_name = env.last_name;
        this.password = env.password;
        this.birthday = env.birthday;
        this.document_type = env.document_type;
        this.document_number = env.document_number;
        this.password = env.password;
        this.password_confirmation = env.password;
        this.gender = env.gender;
        this.phone = env.phone;
        this.country = env.country;
        this.address = env.address;
        this.enable = true;
        this.roles = role ? [role] : [];
        this.permissions = [];
        this.is_super_admin = env.is_super_admin === 'true';
    }

    get_first_name(): string
    {
        return this.first_name;
    }

    get_last_name(): string
    {
        return this.last_name;
    }

    get_email(): string
    {
        return this.email;
    }

    get_birthday(): string
    {
        return this.birthday;
    }

    get_document_number(): string
    {
        return this.document_number;
    }

    get_document_type(): string
    {
        return this.document_type;
    }

    get_gender(): string
    {
        return this.gender;
    }

    get_phone(): string
    {
        return this.phone;
    }

    get_country(): string
    {
        return this.country;
    }

    get_address(): string
    {
        return this.address;
    }

    get_password(): string
    {
        return this.password;
    }

    get_password_confirmation(): string
    {
        return this.password;
    }

    get_enable(): boolean
    {
        return this.enable;
    }

    get_confirmation_token(): null
    {
        return null;
    }

    get_password_requested_at(): null
    {
        return null;
    }

    get_roles(): IRoleDomain[]
    {
        return this.roles;
    }

    get_permissions(): string[]
    {
        return this.permissions;
    }

    get_is_super_admin(): boolean
    {
        return this.is_super_admin;
    }
}

export default UserCommandSaveRequest;
