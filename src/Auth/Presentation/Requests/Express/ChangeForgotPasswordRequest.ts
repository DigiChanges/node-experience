import Config from 'config';
import {IsString, Length} from 'class-validator';
import * as express from 'express';
import {IEncryption} from '@digichanges/shared-experience';

import ChangeForgotPasswordPayload from '../../../InterfaceAdapters/Payloads/ChangeForgotPasswordPayload';
import EncryptionFactory from '../../../../Shared/Factories/EncryptionFactory';
import {Match} from '../../../../Shared/Decorators/match';

class ChangeForgotPasswordRequest implements ChangeForgotPasswordPayload
{
    @IsString()
    @Length(Config.get('validationSettings.password.min'), Config.get('validationSettings.password.max'))
    password: string;

    @IsString()
    @Length(Config.get('validationSettings.password.min'), Config.get('validationSettings.password.max'))
    @Match('password', {message: 'passwordConfirmation don\'t match'})
    passwordConfirmation: string;

    @IsString()
    confirmationToken: string;

    constructor(request: express.Request)
    {
        this.password = request.body.password;
        this.passwordConfirmation = request.body.passwordConfirmation;
        this.confirmationToken = request.body.confirmationToken;
    }

    getConfirmationToken(): string
    {
        return this.confirmationToken;
    }

    async getPassword(): Promise<string>
    {
        const encryption: IEncryption = EncryptionFactory.create();

        return await encryption.encrypt(this.password);
    }

    getPasswordConfirmation(): string
    {
        return this.passwordConfirmation;
    }
}

export default ChangeForgotPasswordRequest;
