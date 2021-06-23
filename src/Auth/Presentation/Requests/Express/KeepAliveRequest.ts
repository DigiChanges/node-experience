import KeepAlivePayload from '../../../InterfaceAdapters/Payloads/KeepAlivePayload';
import {IsEmail} from 'class-validator';
import {IsUUID} from 'class-validator';

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

    getEmail(): string
    {
        return this.email;
    }

    getTokenId(): string
    {
        return this.id;
    }
}

export default KeepAliveRequest;
