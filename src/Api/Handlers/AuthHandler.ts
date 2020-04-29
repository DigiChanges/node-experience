import {NextFunction, Request, Response} from 'express';
import { inject } from 'inversify'
import { TYPES } from "../../types";
import Responder from "../../Lib/Responder";
import { controller, httpPost, request, response, next } from 'inversify-express-utils';
import AuthRequest from "../Requests/Auth/AuthRequest";
import ForgotPasswordRequest from "../Requests/Auth/ForgotPasswordRequest";
import ChangeForgotPasswordRequest from "../Requests/Auth/ChangeForgotPasswordRequest";
import KeepAliveRequest from "../Requests/Auth/KeepAliveRequest";
import AuthService from "../../Services/AuthService";
import StatusCode from "../../Lib/StatusCode";
import AuthTransformer from "../Transformers/Auth/AuthTransformer";
import ValidatorRules from '../../Middlewares/ValidatorRules';
import AuthorizeMiddleware from "../../Middlewares/AuthorizeMiddleware";
import Permissions from "../Libs/Permissions";

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

    @httpPost('/login', ...AuthRequest.validate(), ValidatorRules)
    public async login (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const authRequest = new AuthRequest(req);

        const payload = await this.service.login(authRequest);

        this.responder.send(payload, res, StatusCode.HTTP_CREATED, new AuthTransformer());
    }

    @httpPost('/keepAlive', AuthorizeMiddleware(Permissions.AUTH_KEEP_ALIVE))
    public async keepAlive (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const keepRequest = new KeepAliveRequest(req);

        const payload = await this.service.regenerateToken(keepRequest);

        this.responder.send(payload, res, StatusCode.HTTP_CREATED, new AuthTransformer());
    }

    @httpPost('/forgotPassword', ...ForgotPasswordRequest.validate(), ValidatorRules)
    public async forgotPassword (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const forgotRequest = new ForgotPasswordRequest(req);

        const payload = await this.service.forgotPassword(forgotRequest);

        this.responder.send(payload, res, StatusCode.HTTP_CREATED, null);
    }

    @httpPost('/changeForgotPassword', ...ChangeForgotPasswordRequest.validate(), ValidatorRules)
    public async changeForgotPassword (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const changeForgotPasswordRequest = new ChangeForgotPasswordRequest(req);

        const payload = await this.service.changeForgotPassword(changeForgotPasswordRequest);

        this.responder.send(payload, res, StatusCode.HTTP_CREATED, null);
    }
}

export default AuthHandler;
