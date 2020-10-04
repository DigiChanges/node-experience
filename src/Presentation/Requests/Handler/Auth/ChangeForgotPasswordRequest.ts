import * as express from "express";
import ChangeForgotPasswordPayload from "../../../../InterfaceAdapters/Payloads/Auth/ChangeForgotPasswordPayload";
import IEncryption from "../../../../InterfaceAdapters/Shared/IEncryption";
import EncryptionFactory from "../../../../Infrastructure/Factories/EncryptionFactory";
import Config from "config";
import {IsString, Length} from "class-validator";
import {Match} from "../../../../Infrastructure/Shared/Decorators/match";

class ChangeForgotPasswordRequest implements ChangeForgotPasswordPayload
{
    @IsString()
    @Length(Config.get('validationSettings.password.min'), Config.get('validationSettings.password.max'))
    password: string;

    @IsString()
    @Length(Config.get('validationSettings.password.min'), Config.get('validationSettings.password.max'))
    @Match('password', {message: "passwordConfirmation don't match"})
    passwordConfirmation: string;

    @IsString()
    confirmationToken: string;

    constructor(request: express.Request)
    {
        this.password = request.body.password;
        this.confirmationToken = request.body.confirmationToken;
    }

    getConfirmationToken(): string
    {
        return this.confirmationToken;
    }

    async getPassword(): Promise<string>
    {
        let encryption: IEncryption = EncryptionFactory.create();

        return await encryption.encrypt(this.password);
    }

    getPasswordConfirmation(): string
    {
        return this.passwordConfirmation;
    }
}

export default ChangeForgotPasswordRequest;
