import { IsEmail } from 'class-validator';
import { IEncryption } from '@digichanges/shared-experience';

import ForgotPasswordPayload from '../../../InterfaceAdapters/Payloads/ForgotPasswordPayload';
import moment from 'moment';
import EncryptionFactory from '../../../../Shared/Factories/EncryptionFactory';

class ForgotPasswordRequest implements ForgotPasswordPayload
{
    @IsEmail()
    email: string;

    constructor(data: Record<string, any>)
    {
        this.email = data.email;
    }

    get_email(): string
    {
        return this.email;
    }

    async get_confirmation_token(): Promise<string>
    {
        const encryption: IEncryption = EncryptionFactory.create('md5');

        const stringToEncrypt = `${this.email}${moment().utc().unix()}`;

        return await encryption.encrypt(stringToEncrypt);
    }

    get_password_requested_at(): Date
    {
        return moment().toDate();
    }
}

export default ForgotPasswordRequest;
