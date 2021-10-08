import UserRepPayload from '../../../InterfaceAdapters/Payloads/UserRepPayload';
import IRoleDomain from '../../../../Role/InterfaceAdapters/IRoleDomain';
import { ArrayMinSize, IsArray, IsBoolean, IsEmail, IsString, Length } from 'class-validator';
import { decorate } from 'ts-mixer';

class UserRepRequest implements UserRepPayload
{
    @decorate(Length(3, 50))
    @decorate(IsString())
    first_name: string;

    @decorate(Length(3, 50))
    @decorate(IsString())
    last_name: string;

    @decorate(IsEmail())
    email: string;

    @decorate(Length(3, 10))
    @decorate(IsString())
    birthday: string;

    @decorate(Length(2, 20))
    @decorate(IsString())
    document_type: string;

    @decorate(Length(3, 16))
    @decorate(IsString())
    document_number: string;

    @decorate(Length(3, 20))
    @decorate(IsString())
    gender: string;

    @decorate(Length(3, 20))
    @decorate(IsString())
    phone: string;

    @decorate(Length(2, 2))
    @decorate(IsString())
    country: string;

    @decorate(Length(10, 60))
    @decorate(IsString())
    address: string;

    @decorate(IsBoolean())
    enable: boolean;

    @decorate(IsArray())
    @decorate(ArrayMinSize(0))
    @decorate(IsString({
        each: true
    }))
    permissions: string[];

    constructor(data: Record<string, any>)
    {
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.email = data.email;
        this.birthday = data.birthday;
        this.document_type = data.document_type;
        this.document_number = data.document_number;
        this.gender = data.gender;
        this.phone = data.phone;
        this.country = data.country;
        this.address = data.address;
        this.permissions = data.permissions;
        this.enable = data.enable ?? true;
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

    get_document_type(): string
    {
        return this.document_type;
    }

    get_document_number(): string
    {
        return this.document_number;
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
        return [];
    }

    get_permissions(): string[]
    {
        return this.permissions;
    }

    get_is_super_admin(): boolean
    {
        return false;
    }
}

export default UserRepRequest;
