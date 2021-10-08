import Config from 'config';

import { IsString, Length } from 'class-validator';
import { Match } from '../../../../Shared/Decorators/match';
import { decorate } from 'ts-mixer';
import UserPasswordRepPayload from '../../../InterfaceAdapters/Payloads/UserPasswordPayload';

class UserRepPasswordRequest implements UserPasswordRepPayload
{
    @decorate(Length(Config.get('validationSettings.password.min'), Config.get('validationSettings.password.max')))
    @decorate(IsString())
    password: string;

    @decorate(Length(Config.get('validationSettings.password.min'), Config.get('validationSettings.password.max')))
    @decorate(IsString())
    @decorate(Match('password'))
    password_confirmation: string;

    constructor(data: Record<string, any>)
    {
        this.password = data.password;
        this.password_confirmation = data.password_confirmation;
    }

    get_password(): string
    {
        return this.password;
    }

    get_password_confirmation(): string
    {
        return this.password_confirmation;
    }
}

export default UserRepPasswordRequest;
