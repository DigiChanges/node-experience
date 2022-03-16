import { IsString, Length } from 'class-validator';
import { decorate } from 'ts-mixer';
import MainConfig from '../../../Config/mainConfig';
import { Match } from '../../../Shared/Decorators/match';
import UserPasswordRepPayload from '../../Domain/Payloads/UserPasswordPayload';

class UserPasswordRequest implements UserPasswordRepPayload
{
    private readonly _password: string;
    private readonly _passwordConfirmation: string;

    constructor(data: Record<string, any>)
    {
        this._password = data.password;
        this._passwordConfirmation = data.passwordConfirmation;
    }

    @decorate(Length(MainConfig.getInstance().getConfig().validationSettings.password.minLength,
        MainConfig.getInstance().getConfig().validationSettings.password.maxLength))
    @decorate(IsString())
    get password(): string
    {
        return this._password;
    }

    @decorate(Length(MainConfig.getInstance().getConfig().validationSettings.password.minLength,
        MainConfig.getInstance().getConfig().validationSettings.password.maxLength))
    @decorate(IsString())
    @decorate(Match('password'))
    get passwordConfirmation(): string
    {
        return this._passwordConfirmation;
    }
}

export default UserPasswordRequest;
