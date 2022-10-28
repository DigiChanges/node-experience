import { decorate } from 'ts-mixer';
import { IsBoolean, IsEmail, IsString, Length, Validate } from 'class-validator';
import UserRepPayload from '../../../Domain/Payloads/User/UserRepPayload';
import IRoleDomain from '../../../Domain/Entities/IRoleDomain';
import { IsValidBirthday } from '../../Helpers/CustomUserValidation';

class UserWithoutPermissionsRequest implements UserRepPayload
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

    constructor(data: Record<string, any>)
    {
        this._firstName = data.firstName;
        this._lastName = data.lastName;
        this._email = data.email;
        this._birthday = data.birthday;
        this._documentType = data.documentType;
        this._documentNumber = data.documentNumber;
        this._gender = data.gender;
        this._phone = data.phone;
        this._country = data.country;
        this._address = data.address;
    }

    @decorate(Length(3, 50))
    @decorate(IsString())
    get firstName(): string
    {
        return this._firstName;
    }

    @decorate(Length(3, 50))
    @decorate(IsString())
    get lastName(): string
    {
        return this._lastName;
    }

    @decorate(IsEmail())
    get email(): string
    {
        return this._email;
    }

    @decorate(IsString())
    @decorate(IsValidBirthday({ message: 'Invalid format' }))

    get birthday(): string
    {
        return this._birthday;
    }

    @decorate(Length(2, 20))
    @decorate(IsString())
    get documentType(): string
    {
        return this._documentType;
    }

    @decorate(Length(3, 16))
    @decorate(IsString())
    get documentNumber(): string
    {
        return this._documentNumber;
    }

    @decorate(Length(3, 20))
    @decorate(IsString())
    get gender(): string
    {
        return this._gender;
    }

    @decorate(Length(3, 20))
    @decorate(IsString())
    get phone(): string
    {
        return this._phone;
    }

    @decorate(Length(2, 2))
    @decorate(IsString())
    get country(): string
    {
        return this._country;
    }

    @decorate(Length(10, 60))
    @decorate(IsString())
    get address(): string
    {
        return this._address;
    }

    @decorate(IsBoolean())
    get enable(): boolean
    {
        return false;
    }

    get passwordRequestedAt(): null
    {
        return null;
    }

    get roles(): IRoleDomain[]
    {
        return [];
    }

    get permissions(): string[]
    {
        return [];
    }

    get isSuperAdmin(): boolean
    {
        return false;
    }
}

export default UserWithoutPermissionsRequest;
