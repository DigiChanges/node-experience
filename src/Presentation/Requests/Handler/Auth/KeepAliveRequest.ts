import KeepAlivePayload from "../../../../InterfaceAdapters/Payloads/Auth/KeepAlivePayload";
import {IsEmail} from "class-validator";
import {IsUUID} from "class-validator";

class KeepAliveRequest implements KeepAlivePayload
{
    @IsEmail()
    email: string;

    @IsUUID("4")
    id: string;

    constructor(request: any)
    {
        this.email = request.tokenDecode.email;
        this.id = request.tokenDecode.id;
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
