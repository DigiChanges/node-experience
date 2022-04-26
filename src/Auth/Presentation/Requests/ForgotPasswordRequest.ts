import { IsDate, IsEmail } from 'class-validator';

import moment from 'moment';
import ForgotPasswordPayload from '../../Domain/Payloads/ForgotPasswordPayload';
import ConfirmationTokenRequest from './ConfirmationTokenRequest';

class ForgotPasswordRequest extends ConfirmationTokenRequest implements ForgotPasswordPayload
{
    private readonly _email: string;

    constructor(data: Record<string, any>)
    {
        super(data);

        this._email = data.email;
    }

    @IsEmail()
    get email(): string
    {
        return this._email;
    }

    @IsDate()
    get passwordRequestedAt(): Date
    {
        return moment().toDate();
    }
}

export default ForgotPasswordRequest;
