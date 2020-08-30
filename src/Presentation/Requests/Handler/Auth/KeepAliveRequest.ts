import * as express from "express";
import KeepAlivePayload from "../../../../InterfaceAdapters/Payloads/Auth/KeepAlivePayload";
import {lazyInject} from "../../../../inversify.config";
import {SERVICES} from "../../../../services";
import IAuthService from "../../../../InterfaceAdapters/IServices/IAuthService";

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