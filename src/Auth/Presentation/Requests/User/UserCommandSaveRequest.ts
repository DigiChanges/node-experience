import IRoleDomain from '../../../Domain/Entities/IRoleDomain';
import UserSavePayload from '../../../Domain/Payloads/User/UserSavePayload';

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

    constructor(data: Record<string, any>, role: any = null)
    {
        this._email = data.email;
        this._firstName = data.firstName;
        this._lastName = data.lastName;
        this._birthday = data.birthday;
        this._documentType = data.documentType;
        this._documentNumber = data.documentNumber;
        this._password = data.password;
        this._gender = data.gender;
        this._phone = data.phone;
        this._country = data.country;
        this._address = data.address;
        this._enable = true;
        this._roles = role ? [role] : [];
        this._permissions = [];
        this._isSuperAdmin = data.isSuperAdmin === 'true';
    }

    get firstName(): string
    {
        return this._firstName;
    }

    get lastName(): string
    {
        return this._lastName;
    }

    get email(): string
    {
        return this._email;
    }

    get birthday(): string
    {
        return this._birthday;
    }

    get documentNumber(): string
    {
        return this._documentNumber;
    }

    get documentType(): string
    {
        return this._documentType;
    }

    get gender(): string
    {
        return this._gender;
    }

    get phone(): string
    {
        return this._phone;
    }

    get country(): string
    {
        return this._country;
    }

    get address(): string
    {
        return this._address;
    }

    get password(): string
    {
        return this._password;
    }

    get passwordConfirmation(): string
    {
        return this._password;
    }

    get enable(): boolean
    {
        return this._enable;
    }

    get passwordRequestedAt(): null
    {
        return null;
    }

    get roles(): IRoleDomain[]
    {
        return this._roles;
    }

    get permissions(): string[]
    {
        return this._permissions;
    }

    get isSuperAdmin(): boolean
    {
        return this._isSuperAdmin;
    }
}

export default UserCommandSaveRequest;
