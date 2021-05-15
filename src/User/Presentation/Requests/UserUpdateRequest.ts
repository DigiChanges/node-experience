import UserUpdatePayload from '../../InterfaceAdapters/Payloads/UserUpdatePayload';
import IdRequest from '../../../App/Presentation/Requests/IdRequest';
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

    constructor(request: any)
    {
        super(request);
        this.firstName = request.body.firstName;
        this.lastName = request.body.lastName;
        this.email = request.body.email;
        this.birthday = request.body.birthday;
        this.documentType = request.body.documentType;
        this.documentNumber = request.body.documentNumber;
        this.gender = request.body.gender;
        this.phone = request.body.phone;
        this.country = request.body.country;
        this.address = request.body.address;
        this.enable = request.body.enable;
        this.permissions = request.body.permissions;
        this.userId = request.tokenDecode.userId;
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
