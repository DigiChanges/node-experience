import * as express from "express";
import ForgotPasswordPayload from "../../../Payloads/Auth/ForgotPasswordPayload";
import moment from "moment";
import {body} from "express-validator";
import IEncryptionStrategy from "../../../Lib/Encryption/IEncryptionStrategy";
import EncryptionFactory from "../../../Lib/Factories/EncryptionFactory";
import Config from "../../../../config/config";

class ForgotPasswordRequest implements ForgotPasswordPayload
{
    private request: express.Request;

    constructor(request: express.Request)
    {
        this.request = request;
    }

    email(): string
    {
        return this.request.body.email;
    }

    async confirmationToken(): Promise<string>
    {
        let encryption: IEncryptionStrategy = EncryptionFactory.create(Config.encryption.md5.type);

        let stringToEncrypt = this.email() + moment().utc().unix();

        return await encryption.encrypt(stringToEncrypt);
    }

    passwordRequestedAT(): Date
    {
        return moment().toDate();
    }

    static validate()
    {
        return [
            body('email')
                .exists().withMessage('email must exist')
                .isEmail().withMessage('email must be of type string')
        ];
    }

}

export default ForgotPasswordRequest