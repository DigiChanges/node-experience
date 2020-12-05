import KeepAlivePayload from "../../../../InterfaceAdapters/Payloads/Auth/KeepAlivePayload";
import {IsEmail} from "class-validator";

class KeepAliveRequest implements KeepAlivePayload
{
    @IsEmail()
    email: string;

    constructor(request: any)
    {
        this.email = request.tokenDecode.email;
    }

    getEmail(): string
    {
        return this.email;
    }
}

export default KeepAliveRequest;
