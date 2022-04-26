import { IsArray, IsBoolean, IsString, Length } from 'class-validator';
import IRoleDomain from '../../../Role/Domain/Entities/IRoleDomain';
import UserSavePayload from '../../Domain/Payloads/UserSavePayload';

class UserCommandSaveRequest implements UserSavePayload
{
    private readonly _firstName: string;
    private readonly _lastName: string;
    private readonly _email: string;
    private readonly _birthday: string;
    private readonly _documentType: string;
    private readonly _documentNumber: string;
    private readonly _gender: string;
    private readonly _phone: string;
    private readonly _country: string;
    private readonly _address: string;
    private readonly _password: string;
    private readonly _enable: boolean;
    private readonly _permissions: string[];
    private readonly _roles: IRoleDomain[];
    private readonly _isSuperAdmin: boolean;

    constructor(env: any, role: any = null)
    {
        this._email = env.email;
        this._firstName = env.firstName;
        this._lastName = env.lastName;
        this._birthday = env.birthday;
        this._documentType = env.documentType;
        this._documentNumber = env.documentNumber;
        this._password = env.password;
        this._gender = env.gender;
        this._phone = env.phone;
        this._country = env.country;
        this._address = env.address;
        this._enable = true;
        this._roles = role ? [role] : [];
        this._permissions = [];
        this._isSuperAdmin = env.isSuperAdmin === 'true';
    }

    @IsString()
    get firstName(): string
    {
        return this._firstName;
    }

    @IsString()
    get lastName(): string
    {
        return this._lastName;
    }

    @IsString()
    get email(): string
    {
        return this._email;
    }

    @Length(3, 10)
    @IsString()
    get birthday(): string
    {
        return this._birthday;
    }

    @Length(2, 3)
    @IsString()
    get documentNumber(): string
    {
        return this._documentNumber;
    }

    @Length(3, 16)
    @IsString()
    get documentType(): string
    {
        return this._documentType;
    }

    @Length(1, 20)
    @IsString()
    get gender(): string
    {
        return this._gender;
    }

    @Length(3, 20)
    @IsString()
    get phone(): string
    {
        return this._phone;
    }

    @Length(2, 20)
    @IsString()
    get country(): string
    {
        return this._country;
    }

    @Length(3, 60)
    @IsString()
    get address(): string
    {
        return this._address;
    }

    @IsString()
    get password(): string
    {
        return this._password;
    }

    @IsString()
    get passwordConfirmation(): string
    {
        return this._password;
    }

    @IsBoolean()
    get enable(): boolean
    {
        return this._enable;
    }

    @IsArray()
    get passwordRequestedAt(): null
    {
        return null;
    }

    @IsBoolean()
    get roles(): IRoleDomain[]
    {
        return this._roles;
    }

    @IsArray()
    get permissions(): string[]
    {
        return this._permissions;
    }

    @IsBoolean()
    get isSuperAdmin(): boolean
    {
        return this._isSuperAdmin;
    }
}

export default UserCommandSaveRequest;
