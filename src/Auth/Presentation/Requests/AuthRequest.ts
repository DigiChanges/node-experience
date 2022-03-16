import AuthPayload from '../../Domain/Payloads/AuthPayload';
import MainConfig from '../../../Config/mainConfig';
import { IsString, IsEmail, Length } from 'class-validator';

class AuthRequest implements AuthPayload
{
    private readonly _email: string;
    private readonly _password: string;

    constructor(data: Record<string, any>)
    {
        this._email = data.email;
        this._password = data.password;
    }

    @IsEmail()
    get email(): string
    {
        return this._email;
    }

    @IsString()
    @Length(MainConfig.getInstance().getConfig().validationSettings.password.minLength,
        MainConfig.getInstance().getConfig().validationSettings.password.maxLength)
    get password(): string
    {
        return this._password;
    }
}

export default AuthRequest;
