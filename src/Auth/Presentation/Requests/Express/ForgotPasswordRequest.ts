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
