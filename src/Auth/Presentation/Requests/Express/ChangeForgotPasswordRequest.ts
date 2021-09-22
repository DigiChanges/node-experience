import Config from 'config';
import {IsString, Length} from 'class-validator';
import {IEncryption} from '@digichanges/shared-experience';

import ChangeForgotPasswordPayload from '../../../InterfaceAdapters/Payloads/ChangeForgotPasswordPayload';
import EncryptionFactory from '../../../../Shared/Factories/EncryptionFactory';
import {Match} from '../../../../Shared/Decorators/Match';

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

    constructor(data: Record<string, any>)
    {
        this.password = data.password;
        this.passwordConfirmation = data.passwordConfirmation;
        this.confirmationToken = data.confirmationToken;
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
