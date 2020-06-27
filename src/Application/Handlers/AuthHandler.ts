import {NextFunction, Request, Response} from 'express';
import Responder from "../../Lib/Responder";
import {controller, httpPost, request, response, next} from 'inversify-express-utils';
import AuthRequest from "../Requests/Auth/AuthRequest";
import ForgotPasswordRequest from "../Requests/Auth/ForgotPasswordRequest";
import ChangeForgotPasswordRequest from "../Requests/Auth/ChangeForgotPasswordRequest";
import KeepAliveRequest from "../Requests/Auth/KeepAliveRequest";
import StatusCode from "../../Lib/StatusCode";
import AuthTransformer from "../Transformers/Auth/AuthTransformer";
import ValidatorRules from '../Middlewares/ValidatorRules';
import AuthorizeMiddleware from "../Middlewares/AuthorizeMiddleware";
import Permissions from "../../../config/Permissions";
import LoginUseCase from "../../Domain/UseCases/Auth/LoginUseCase";
import KeepAliveUseCase from "../../Domain/UseCases/Auth/KeepAliveUseCase";
import {lazyInject} from "../../inversify.config";
import ForgotPasswordUseCase from "../../Domain/UseCases/Auth/ForgotPasswordUseCase";
import ChangeForgotPasswordUseCase from "../../Domain/UseCases/Auth/ChangeForgotPasswordUseCase";
import {TYPES} from "../../types";
import {SERVICES} from "../../services";
import IAuthService from "../../InterfaceAdapters/IServices/IAuthService";

@controller('/api/auth')
class AuthHandler
{
    @lazyInject(SERVICES.IAuthService)
    private service: IAuthService;
    @lazyInject(TYPES.Responder)
    private responder: Responder;

    @httpPost('/login', ...AuthRequest.validate(), ValidatorRules)
    public async login (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const authRequest = new AuthRequest(req);
        const loginUseCase = new LoginUseCase();

        const payload = await loginUseCase.handle(authRequest);

        this.responder.send(payload, res, StatusCode.HTTP_CREATED, new AuthTransformer());
    }

    @httpPost('/keepAlive', AuthorizeMiddleware(Permissions.AUTH_KEEP_ALIVE))
    public async keepAlive (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const keepRequest = new KeepAliveRequest(req);
        const keepAliveUseCase = new KeepAliveUseCase();

        const payload = await keepAliveUseCase.handle(keepRequest);

        this.responder.send(payload, res, StatusCode.HTTP_CREATED, new AuthTransformer());
    }

    @httpPost('/forgotPassword', ...ForgotPasswordRequest.validate(), ValidatorRules)
    public async forgotPassword (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const forgotRequest = new ForgotPasswordRequest(req);
        const forgotPasswordUseCase = new ForgotPasswordUseCase();

        const payload = await forgotPasswordUseCase.handle(forgotRequest);

        this.responder.send(payload, res, StatusCode.HTTP_CREATED, null);
    }

    @httpPost('/changeForgotPassword', ...ChangeForgotPasswordRequest.validate(), ValidatorRules)
    public async changeForgotPassword (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const changeForgotPasswordRequest = new ChangeForgotPasswordRequest(req);
        const changeForgotPasswordUseCase = new ChangeForgotPasswordUseCase();

        const payload = await changeForgotPasswordUseCase.handle(changeForgotPasswordRequest);

        this.responder.send(payload, res, StatusCode.HTTP_CREATED, null);
    }
}

export default AuthHandler;
