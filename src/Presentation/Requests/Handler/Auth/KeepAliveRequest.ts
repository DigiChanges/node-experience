import * as express from "express";
import KeepAlivePayload from "../../../../InterfaceAdapters/Payloads/Auth/KeepAlivePayload";
import {lazyInject} from "../../../../inversify.config";
import {SERVICES} from "../../../../services";
import IAuthService from "../../../../InterfaceAdapters/IServices/IAuthService";
import {IsEmail} from "class-validator";

class KeepAliveRequest implements KeepAlivePayload
{
    private readonly request: express.Request;
    @lazyInject(SERVICES.IAuthService)
    private service: IAuthService;

    @IsEmail()
    email: string;

    constructor(request: express.Request)
    {
        this.request = request;
        this.email = this.service.getLoggedEmail(this.request);
    }

    getEmail(): string
    {
        return this.email;
    }
}

export default KeepAliveRequest