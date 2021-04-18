import * as express from 'express';
import AuthPayload from '../../InterfaceAdapters/Payloads/AuthPayload';
import Config from 'config';
import {IsString, IsEmail, Length} from 'class-validator';

class AuthRequest implements AuthPayload
{
    @IsEmail()
    email: string;

    @IsString()
    @Length(Config.get('validationSettings.password.min'), Config.get('validationSettings.password.max'))
    password: string;

    constructor(request: express.Request)
    {
        this.email = request.body.email;
        this.password = request.body.password;
    }

    getEmail(): string
    {
        return this.email;
    }

    getPassword(): string
    {
        return this.password;
    }
}

export default AuthRequest;
