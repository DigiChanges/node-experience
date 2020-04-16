import {NextFunction, Request, Response} from 'express';
import { inject } from 'inversify'
import { TYPES } from "../../types";
import Responder from "../../Lib/Responder";
import {controller, httpPost, request, response, next} from 'inversify-express-utils';

import AuthRequest from "../Requests/Auth/AuthRequest";
import KeepAliveRequest from "../Requests/Auth/KeepAliveRequest";
import AuthService from "../../Services/AuthService";
import StatusCode from "../../Lib/StatusCode";
import AuthTransformer from "../Transformers/Auth/AuthTransformer";

@controller('/api/auth')
class AuthHandler
{
    @inject(AuthService)
    private service: AuthService;
    private responder: Responder;

    constructor(@inject(TYPES.Responder) responder: Responder)
    {
        this.responder = responder;
    }

    @httpPost('/login')
    public async login (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const authRequest = new AuthRequest(req);

        const payload = await this.service.login(authRequest);

        this.responder.send(payload, res, StatusCode.HTTP_CREATED, new AuthTransformer());
    }

    @httpPost('/keepAlive')
    public async keepAlive (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const keepRequest = new KeepAliveRequest(req);

        const email = keepRequest.email();

        const payload = await this.service.regenerateToken(email);

        this.responder.send(payload, res, StatusCode.HTTP_CREATED, new AuthTransformer());
    }

}

export default AuthHandler;
