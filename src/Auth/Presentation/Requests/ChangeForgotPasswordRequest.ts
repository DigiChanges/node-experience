import MainConfig from '../../../Config/MainConfig';
import { IsString, Length } from 'class-validator';

import ChangeForgotPasswordPayload from '../../Domain/Payloads/ChangeForgotPasswordPayload';
import { Match } from '../../../Shared/Decorators/match';

class ChangeForgotPasswordRequest implements ChangeForgotPasswordPayload
{
    private readonly _password: string;
    private readonly _passwordConfirmation: string;
    private readonly _confirmationToken: string;

    constructor(data: Record<string, any>)
    {
        this._password = data.password;
        this._passwordConfirmation = data.passwordConfirmation;
        this._confirmationToken = data.confirmationToken;
    }

    @IsString()
    get confirmationToken(): string
    {
        return `Bearer ${this._confirmationToken}`;
    }

    @IsString()
    @Length(MainConfig.getInstance().getConfig().validationSettings.password.minLength,
        MainConfig.getInstance().getConfig().validationSettings.password.maxLength)
    @Match('password', { message: 'passwordConfirmation don\'t match' })
    get password(): string
    {
        return this._password;
    }

    @IsString()
    @Length(MainConfig.getInstance().getConfig().validationSettings.password.minLength,
        MainConfig.getInstance().getConfig().validationSettings.password.maxLength)
    get passwordConfirmation(): string
    {
        return this._passwordConfirmation;
    }
}

export default ChangeForgotPasswordRequest;
