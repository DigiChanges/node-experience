import { IsEmail } from 'class-validator';

import ForgotPasswordPayload from '../../Domain/Payloads/ForgotPasswordPayload';
import moment from 'moment';

class ForgotPasswordRequest implements ForgotPasswordPayload
{
    private readonly _email: string;

    constructor(data: Record<string, any>)
    {
        this._email = data.email;
    }

    @IsEmail()
    get email(): string
    {
        return this._email;
    }

    get confirmationToken(): string
    {
        return `${this.email}${moment().utc().unix()}`;
    }

    get passwordRequestedAt(): Date
    {
        return moment().toDate();
    }
}

export default ForgotPasswordRequest;
