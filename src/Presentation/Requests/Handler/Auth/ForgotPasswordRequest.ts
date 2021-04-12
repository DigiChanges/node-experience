import * as express from 'express';

import {IsEmail} from 'class-validator';
import {IEncryption} from '@digichanges/shared-experience';

import ForgotPasswordPayload from '../../../../InterfaceAdapters/Payloads/Auth/ForgotPasswordPayload';
import moment from 'moment';
import EncryptionFactory from '../../../../Infrastructure/Factories/EncryptionFactory';

class ForgotPasswordRequest implements ForgotPasswordPayload
{
    @IsEmail()
    email: string;

    constructor(request: express.Request)
    {
        this.email = request.body.email;
    }

    getEmail(): string
    {
        return this.email;
    }

    async getConfirmationToken(): Promise<string>
    {
        const encryption: IEncryption = EncryptionFactory.create('md5');

        const stringToEncrypt = `${this.email}${moment().utc().unix()}`;

        return await encryption.encrypt(stringToEncrypt);
    }

    getPasswordRequestedAT(): Date
    {
        return moment().toDate();
    }
}

export default ForgotPasswordRequest;
