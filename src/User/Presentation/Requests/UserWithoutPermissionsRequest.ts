import { decorate, Mixin } from 'ts-mixer';
import { IsEmail, IsString, Length } from 'class-validator';
import IRoleDomain from '../../../Role/InterfaceAdapters/IRoleDomain';
import { REPOSITORIES } from '../../../repositories';
import UserRepPayload from '../../InterfaceAdapters/Payloads/UserRepPayload';

class UserWithoutPermissionsRequest implements UserRepPayload
{
    @decorate(Length(3, 50))
    @decorate(IsString())
    firstName: string;

    @decorate(Length(3, 50))
    @decorate(IsString())
    lastName: string;

    @decorate(IsEmail())
    email: string;

    @decorate(Length(3, 10))
    @decorate(IsString())
    birthday: string;

    @decorate(Length(2, 20))
    @decorate(IsString())
    documentType: string;

    @decorate(Length(3, 16))
    @decorate(IsString())
    documentNumber: string;

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

    constructor(data: Record<string, any>)
    {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.birthday = data.birthday;
        this.documentType = data.documentType;
        this.documentNumber = data.documentNumber;
        this.gender = data.gender;
        this.phone = data.phone;
        this.country = data.country;
        this.address = data.address;
    }

    getFirstName(): string
    {
        return this.firstName;
    }

    getLastName(): string
    {
        return this.lastName;
    }

    getEmail(): string
    {
        return this.email;
    }

    getBirthday(): string
    {
        return this.birthday;
    }

    getDocumentType(): string
    {
        return this.documentType;
    }

    getDocumentNumber(): string
    {
        return this.documentNumber;
    }

    getGender(): string
    {
        return this.gender;
    }

    getPhone(): string
    {
        return this.phone;
    }

    getCountry(): string
    {
        return this.country;
    }

    getAddress(): string
    {
        return this.address;
    }

    getEnable(): boolean
    {
        return false;
    }

    getConfirmationToken(): Promise<string>
    {
        return null;
    }

    getPasswordRequestedAt(): null
    {
        return null;
    }

    getRoles(): IRoleDomain[]
    {
        return [];
    }

    getPermissions(): string[]
    {
        return [];
    }

    getIsSuperAdmin(): boolean
    {
        return false;
    }
}

export default UserWithoutPermissionsRequest;
