import Config from 'config';

import {IsString, Length} from 'class-validator';
import {Match} from '../../../../Shared/Decorators/match';
import {decorate} from 'ts-mixer';
import UserPasswordRepPayload from '../../../InterfaceAdapters/Payloads/UserPasswordPayload';

class UserRepPasswordRequest implements UserPasswordRepPayload
{
    @decorate(Length(Config.get('validationSettings.password.min'), Config.get('validationSettings.password.max')))
    @decorate(IsString())
    password: string;

    @decorate(Length(Config.get('validationSettings.password.min'), Config.get('validationSettings.password.max')))
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
