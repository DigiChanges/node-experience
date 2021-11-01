import { mainConfig } from '../../../../Config/mainConfig';
import { IsString, Length } from 'class-validator';

import ChangeForgotPasswordPayload from '../../../InterfaceAdapters/Payloads/ChangeForgotPasswordPayload';
import { Match } from '../../../../Shared/Decorators/match';

class ChangeForgotPasswordRequest implements ChangeForgotPasswordPayload
{
    @IsString()
    @Length(mainConfig.validationSettings.password.minLength, mainConfig.validationSettings.password.maxLength)
    password: string;

    @IsString()
    @Length(mainConfig.validationSettings.password.minLength, mainConfig.validationSettings.password.maxLength)
    @Match('password', { message: 'passwordConfirmation don\'t match' })
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

    getPassword(): string
    {
        return this.password;
    }

    getPasswordConfirmation(): string
    {
        return this.passwordConfirmation;
    }
}

export default ChangeForgotPasswordRequest;
