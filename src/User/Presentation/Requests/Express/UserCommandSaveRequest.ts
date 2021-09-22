import IRoleDomain from '../../../../Role/InterfaceAdapters/IRoleDomain';
import {ArrayMinSize, IsArray, IsBoolean, IsString, Length} from 'class-validator';
import UserSavePayload from '../../../InterfaceAdapters/Payloads/UserSavePayload';

class UserCommandSaveRequest implements UserSavePayload
{
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    email: string;

    @Length(3, 10)
    @IsString()
    birthday: string;

    @Length(2, 3)
    @IsString()
    documentType: string;

    @Length(3, 16)
    @IsString()
    documentNumber: string;

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
    passwordConfirmation: string;

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
    isSuperAdmin: boolean;

    constructor(env: any, role: any = null)
    {
        this.email = env.email;
        this.firstName = env.firstName;
        this.lastName = env.lastName;
        this.password = env.password;
        this.birthday = env.birthday;
        this.documentType = env.documentType;
        this.documentNumber = env.documentNumber;
        this.password = env.password;
        this.passwordConfirmation = env.password;
        this.gender = env.gender;
        this.phone = env.phone;
        this.country = env.country;
        this.address = env.address;
        this.enable = true;
        this.roles = role ? [role] : [];
        this.permissions = [];
        this.isSuperAdmin = env.isSuperAdmin === 'true';
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

    getDocumentNumber(): string
    {
        return this.documentNumber;
    }

    getDocumentType(): string
    {
        return this.documentType;
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

    getPassword(): string
    {
        return this.password;
    }

    getPasswordConfirmation(): string
    {
        return this.password;
    }

    getEnable(): boolean
    {
        return this.enable;
    }

    getConfirmationToken(): null
    {
        return null;
    }

    getPasswordRequestedAt(): null
    {
        return null;
    }

    getRoles(): IRoleDomain[]
    {
        return this.roles;
    }

    getPermissions(): string[]
    {
        return this.permissions;
    }

    getIsSuperAdmin(): boolean
    {
        return this.isSuperAdmin;
    }
}

export default UserCommandSaveRequest;
