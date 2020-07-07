import * as express from "express";
import ChangeForgotPasswordPayload from "../../../InterfaceAdapters/Payloads/Auth/ChangeForgotPasswordPayload";
import {body} from "express-validator";
import IEncryptionStrategy from "../../../InterfaceAdapters/Shared/IEncryptionStrategy";
import EncryptionFactory from "../../../Infrastructure/Factories/EncryptionFactory";
import Config from "config";

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
            body('password')
                .exists().withMessage('password must exist')
                .isLength({ min: Config.get('validationSettings.password.min'), max: Config.get('validationSettings.password.max') }).withMessage("password can\'t be empty")
                .isString().withMessage('password must be of type string')
                .custom((value, { req }) => value === req.body.passwordConfirmation).withMessage("password don't match"),
            body('passwordConfirmation')
                .exists().withMessage('passwordConfirmation must exist')
                .isLength({ min: Config.get('validationSettings.password.min'), max: Config.get('validationSettings.password.max') }).withMessage("passwordConfirmation can\'t be empty")
                .isString().withMessage('passwordConfirmation must be of type string'),
        ];
    }

}

export default ChangeForgotPasswordRequest