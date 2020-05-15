import * as express from "express";
import ChangeForgotPasswordPayload from "../../../Payloads/Auth/ChangeForgotPasswordPayload";
import {body} from "express-validator";
import IEncryptionStrategy from "../../../Lib/Encryption/IEncryptionStrategy";
import EncryptionFactory from "../../../Lib/Factories/EncryptionFactory";

class ChangeForgotPasswordRequest implements ChangeForgotPasswordPayload
{
    private request: express.Request;

    constructor(request: express.Request)
    {
        this.request = request;
    }

    confirmationToken(): string
    {
        return this.request.body.confirmationToken;
    }

    async password(): Promise<string>
    {
        let encryption: IEncryptionStrategy = EncryptionFactory.create();

        return await encryption.encrypt(this.request.body.password);
    }

    passwordConfirmation(): string {
        return this.request.body.passwordConfirmation;
    }

    static validate()
    {
        return [
            body('passwordConfirmation')
                .exists().withMessage('passwordConfirmation must exist')
                .isString().withMessage('passwordConfirmation must be of type string'),
            body('password')
                .exists().withMessage('password must exist')
                .isString().withMessage('password must be of type string')
                .custom((value, { req }) => value === req.body.passwordConfirmation).withMessage("password don't match"),
            body('passwordConfirmation')
                .exists().withMessage('passwordConfirmation must exist')
                .isString().withMessage('passwordConfirmation must be of type string'),
        ];
    }

}

export default ChangeForgotPasswordRequest