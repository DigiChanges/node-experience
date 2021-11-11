import { IsString } from 'class-validator';
import VerifyYourAccountPayload from '../../../InterfaceAdapters/Payloads/VerifyYourAccountPayload';

class VerifyYourAccountRequest implements VerifyYourAccountPayload
{
    @IsString()
    confirmationToken: string;

    constructor(confirmationToken: string)
    {
        this.confirmationToken = confirmationToken;
    }

    getConfirmationToken(): string
    {
        return this.confirmationToken;
    }
}

export default VerifyYourAccountRequest;
