import UserUpdatePayload from '../../../InterfaceAdapters/Payloads/UserUpdatePayload';
import IdRequest from '../../../../App/Presentation/Requests/Express/IdRequest';
import {ArrayMinSize, IsArray, IsBoolean, IsEmail, IsString, Length} from 'class-validator';

class UserUpdateRequest extends IdRequest implements UserUpdatePayload
{
    @Length(3, 50)
    @IsString()
    firstName: string

    @Length(3, 50)
    @IsString()
    lastName: string

    @Length(3, 10)
    @IsString()
    birthday: string;

    @Length(2, 3)
    @IsString()
    documentType: string;

    @Length(3, 16)
    @IsString()
    documentNumber: string;

    @Length(3, 20)
    @IsString()
    gender: string;

    @Length(3, 20)
    @IsString()
    phone: string;

    @Length(2, 20)
    @IsString()
    country: string;

    @Length(10, 60)
    @IsString()
    address: string;

    @IsEmail()
    email: string

    @IsBoolean()
    enable: boolean

    @IsString()
    userId: string;

    @IsArray()
    @ArrayMinSize(0)
    @IsString({
        each: true

    })
    permissions: string[]

    constructor(data: Record<string, any>, id: string, userId: string)
    {
        super(id);
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
        this.enable = data.enable;
        this.permissions = data.permissions;
        this.userId = userId;
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
        return this.enable;
    }

    getTokenUserId(): string
    {
        return this.userId;
    }
    getPermissions(): string[]
    {
        return this.permissions;
    }
}

export default UserUpdateRequest;
