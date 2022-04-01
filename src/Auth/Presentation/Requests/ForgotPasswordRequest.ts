import { IsDate, IsEmail, IsString } from 'class-validator';

import ForgotPasswordPayload from '../../Domain/Payloads/ForgotPasswordPayload';
import moment from 'moment';
import jwt from 'jwt-simple';
import MainConfig from '../../../Config/mainConfig';

class ForgotPasswordRequest implements ForgotPasswordPayload
{
    private readonly _email: string;
    private readonly _payload: Record<string, any>;
    private readonly _secret: string;

    constructor(data: Record<string, any>)
    {
        const { iss, secret, aud } = MainConfig.getInstance().getConfig().jwt;
        const expires = moment().utc().add({ minutes: 5 }).unix();

        this._email = data.email;
        this._secret = secret;
        this._payload = {
            iss,
            aud,
            sub: this._email,
            iat: expires,
            exp: expires,
            email: this._email
        };
    }

    @IsEmail()
    get email(): string
    {
        return this._email;
    }

    @IsString()
    get confirmationToken(): string
    {
        return jwt.encode(this._payload, this._secret, 'HS512');
    }

    @IsDate()
    get passwordRequestedAt(): Date
    {
        return moment().toDate();
    }
}

export default ForgotPasswordRequest;
