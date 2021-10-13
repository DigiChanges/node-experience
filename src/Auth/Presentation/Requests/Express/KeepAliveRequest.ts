import KeepAlivePayload from '../../../InterfaceAdapters/Payloads/KeepAlivePayload';
import { IsEmail } from 'class-validator';
import { IsUUID } from 'class-validator';

class KeepAliveRequest implements KeepAlivePayload
{
    @IsEmail()
    email: string;

    @IsUUID('4')
    id: string;

    constructor(data: Record<string, any>)
    {
        this.email = data.email;
        this.id = data.id;
    }

    get_email(): string
    {
        return this.email;
    }

    get_token_id(): string
    {
        return this.id;
    }
}

export default KeepAliveRequest;
