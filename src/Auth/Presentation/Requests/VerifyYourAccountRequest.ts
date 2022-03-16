import { IsString } from 'class-validator';
import VerifyYourAccountPayload from '../../Domain/Payloads/VerifyYourAccountPayload';

class VerifyYourAccountRequest implements VerifyYourAccountPayload
{
    private readonly _confirmationToken: string;

    constructor(confirmationToken: string)
    {
        this._confirmationToken = confirmationToken;
    }

    @IsString()
    get confirmationToken(): string
    {
        return this._confirmationToken;
    }
}

export default VerifyYourAccountRequest;
