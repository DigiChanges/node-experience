import { IsString, Length } from 'class-validator';
import { decorate } from 'ts-mixer';
import MainConfig from '../../../Config/mainConfig';
import { Match } from '../../../Shared/Decorators/match';
import UserPasswordRepPayload from '../../InterfaceAdapters/Payloads/UserPasswordPayload';

class UserRepPasswordRequest implements UserPasswordRepPayload
{
    @decorate(Length(MainConfig.getInstance().getConfig().validationSettings.password.minLength,
        MainConfig.getInstance().getConfig().validationSettings.password.maxLength))
    @decorate(IsString())
    password: string;

    @decorate(Length(MainConfig.getInstance().getConfig().validationSettings.password.minLength,
        MainConfig.getInstance().getConfig().validationSettings.password.maxLength))
    @decorate(IsString())
    @decorate(Match('password'))
    passwordConfirmation: string;

    constructor(data: Record<string, any>)
    {
        this.password = data.password;
        this.passwordConfirmation = data.passwordConfirmation;
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

export default UserRepPasswordRequest;
