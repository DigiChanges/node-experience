import * as express from 'express';
import Config from 'config';

import UserRepPayload from '../../../InterfaceAdapters/Payloads/UserRepPayload';
import IRoleDomain from '../../../../Role/InterfaceAdapters/IRoleDomain';
import {ArrayMinSize, IsArray, IsBoolean, IsEmail, IsString, Length} from 'class-validator';
import {Match} from '../../../../Shared/Decorators/match';

class UserRepRequest implements UserRepPayload
{
    @Length(3, 50)
    @IsString()
    firstName: string;

    @Length(3, 50)
    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @Length(3, 10)
    @IsString()
    birthday: string;

    @Length(2, 20)
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

    @Length(2, 2)
    @IsString()
    country: string;

    @Length(10, 60)
    @IsString()
    address: string;

    @Length(Config.get('validationSettings.password.min'), Config.get('validationSettings.password.max'))
    @IsString()
    password: string;

    @Length(Config.get('validationSettings.password.min'), Config.get('validationSettings.password.max'))
    @IsString()
    @Match('password')
    passwordConfirmation: string;

    @IsBoolean()
    enable: boolean;

    @IsArray()
    @ArrayMinSize(0)
    @IsString({
        each: true
    })
    permissions: string[];

    constructor(request: express.Request)
    {
        this.firstName = request.body.firstName;
        this.lastName = request.body.lastName;
        this.email = request.body.email;
        this.password = request.body.password;
        this.passwordConfirmation = request.body.passwordConfirmation;
        this.birthday = request.body.birthday;
        this.documentType = request.body.documentType;
        this.documentNumber = request.body.documentNumber;
        this.gender = request.body.gender;
        this.phone = request.body.phone;
        this.country = request.body.country;
        this.address = request.body.address;
        this.permissions = request.body.permissions;
        this.passwordConfirmation = request.body.passwordConfirmation;
        this.enable = request.body.enable ?? true;
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

    getPassword(): string
    {
        return this.password;
    }

    getPasswordConfirmation(): string
    {
        return this.passwordConfirmation;
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
        return [];
    }

    getPermissions(): string[]
    {
        return this.permissions;
    }

    getIsSuperAdmin(): boolean
    {
        return false;
    }
}

export default UserRepRequest;
