import * as express from "express";
import KeepAlivePayload from "../../../Payloads/Auth/KeepAlivePayload";
import AuthService from "../../../Services/AuthService";

class KeepAliveRequest implements KeepAlivePayload
{
    private request: express.Request;

    constructor(request: express.Request)
    {
        this.request = request;
    }

    email(): string
    {
        return AuthService.getLoggedEmail(this.request);
    }
}

export default KeepAliveRequest