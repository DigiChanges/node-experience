import AuthPayload from '../../Domain/Payloads/AuthPayload';
import MainConfig from '../../../Config/mainConfig';
import { IsString, IsEmail, Length } from 'class-validator';

class AuthRequest implements AuthPayload
{
    @IsEmail()
    email: string;

    @IsString()
    @Length(MainConfig.getInstance().getConfig().validationSettings.password.minLength,
        MainConfig.getInstance().getConfig().validationSettings.password.maxLength)
    password: string;

    constructor(data: Record<string, any>)
    {
        this.email = data.email;
        this.password = data.password;
    }

    getEmail(): string
    {
        return this.email;
    }

    getPassword(): string
    {
        return this.password;
    }
}

export default AuthRequest;
