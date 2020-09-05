import KeepAlivePayload from "../../../../InterfaceAdapters/Payloads/Auth/KeepAlivePayload";
import {lazyInject} from "../../../../inversify.config";
import {SERVICES} from "../../../../services";
import IAuthService from "../../../../InterfaceAdapters/IServices/IAuthService";
import {IsEmail} from "class-validator";

class KeepAliveRequest implements KeepAlivePayload
{
    @lazyInject(SERVICES.IAuthService)
    private service: IAuthService;

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
