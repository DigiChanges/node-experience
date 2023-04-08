import IRoleDomain from '../../../Domain/Entities/IRoleDomain';
import UserSavePayload from '../../../Domain/Payloads/User/UserSavePayload';

class UserCommandSaveRequest implements UserSavePayload
{
    private readonly _firstName: string;
    private readonly _lastName: string;
    private readonly _email: string;
    private readonly _birthdate: string;
    private readonly _genre: string;
    private readonly _phone: string;
    private readonly _country: string;
    private readonly _password: string;
    private readonly _enable: boolean;
    private readonly _roles: IRoleDomain[];

    constructor(data: Record<string, any>, role: any = null)
    {
        this._email = data.email;
        this._firstName = data.firstName;
        this._lastName = data.lastName;
        this._birthdate = data.birthdate;
        this._password = data.password;
        this._genre = data.genre;
        this._phone = data.phone;
        this._country = data.country;
        this._enable = true;
        this._roles = role ? [role] : [];
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

    get birthdate(): string
    {
        return this._birthdate;
    }

    get genre(): string
    {
        return this._genre;
    }

    get phone(): string
    {
        return this._phone;
    }

    get country(): string
    {
        return this._country;
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
}

export default UserCommandSaveRequest;
