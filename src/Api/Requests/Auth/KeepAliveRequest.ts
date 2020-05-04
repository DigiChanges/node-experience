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
        let tokenDecoded = AuthService.decodeToken(this.request.get('Authorization'));

        return tokenDecoded.email;
    }
}

export default KeepAliveRequest