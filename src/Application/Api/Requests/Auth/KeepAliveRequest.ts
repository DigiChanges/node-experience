import * as express from "express";
import KeepAlivePayload from "../../../../Domain/Payloads/Auth/KeepAlivePayload";
import {lazyInject} from "../../../../inversify.config";
import {SERVICES} from "../../../../services";
import IAuthService from "../../../../Domain/Services/Contracts/IAuthService";

class KeepAliveRequest implements KeepAlivePayload
{
    private readonly request: express.Request;
    @lazyInject(SERVICES.IAuthService)
    private service: IAuthService;

    constructor(request: express.Request)
    {
        this.request = request;
    }

    email(): string
    {
        return this.service.getLoggedEmail(this.request);
    }
}

export default KeepAliveRequest