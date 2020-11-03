import * as express from "express";
import ForgotPasswordPayload from "../../../../InterfaceAdapters/Payloads/Auth/ForgotPasswordPayload";
import moment from "moment";
import IEncryption from "../../../../InterfaceAdapters/Shared/IEncryption";
import EncryptionFactory from "../../../../Infrastructure/Factories/EncryptionFactory";
import Config from "config";
import {IsEmail} from "class-validator";

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
        let encryption: IEncryption = EncryptionFactory.create(Config.get('encryption.md5.type'));

        let stringToEncrypt = this.email + moment().utc().unix();

        return await encryption.encrypt(stringToEncrypt);
    }

    getPasswordRequestedAT(): Date
    {
        return moment().toDate();
    }
}

export default ForgotPasswordRequest;
