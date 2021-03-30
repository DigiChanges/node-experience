import * as express from 'express';
import Config from 'config';

import UserRepPayload from '../../../../InterfaceAdapters/Payloads/Users/UserRepPayload';
import IRoleDomain from '../../../../InterfaceAdapters/IDomain/IRoleDomain';
import {ArrayMinSize, IsArray, IsBoolean, IsEmail, IsString, Length} from 'class-validator';
import {Match} from '../../../../Infrastructure/Shared/Decorators/match';

class UserRepRequest implements UserRepPayload
{
    @Length(3, 50)
    @IsString()
    firstName: string

    @Length(3, 50)
    @IsString()
    lastName: string

    @IsEmail()
    email: string

    @Length(Config.get('validationSettings.password.min'), Config.get('validationSettings.password.max'))
    @IsString()
    password: string

    @Length(Config.get('validationSettings.password.min'), Config.get('validationSettings.password.max'))
    @IsString()
    @Match('password')
    passwordConfirmation: string

    @IsBoolean()
    enable: boolean

    @IsArray()
    @ArrayMinSize(0)
    @IsString({
        each: true,

    })
    permissions: string[]

    constructor(request: express.Request)
    {
        this.firstName = request.body.firstName;
        this.lastName = request.body.lastName;
        this.email = request.body.email;
        this.password = request.body.password;
        this.passwordConfirmation = request.body.passwordConfirmation;
        this.permissions = request.body.permissions;
        this.passwordConfirmation = request.body.passwordConfirmation;
        this.enable = request.body.hasOwnProperty('enable') ? request.body.enable : true;
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
