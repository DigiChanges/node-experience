import { controller, httpPost, request, response, next } from "inversify-express-utils";
import { NextFunction, Request, Response } from "express";

import {lazyInject } from "../../inversify.config";
import {TYPES} from "../../types";
import {SERVICES} from "../../services";
import StatusCode from "../../Lib/StatusCode";
import Responder from "../../Lib/Responder";

import ValidatorRules from "../Middlewares/ValidatorRules";
import AuthorizeMiddleware from "../Middlewares/AuthorizeMiddleware";
import Permissions from "../../../config/Permissions";

import AuthRequest from "../Requests/Auth/AuthRequest";
import ForgotPasswordRequest from "../Requests/Auth/ForgotPasswordRequest";
import ChangeForgotPasswordRequest from "../Requests/Auth/ChangeForgotPasswordRequest";
import KeepAliveRequest from "../Requests/Auth/KeepAliveRequest";
import AuthTransformer from "../Transformers/Auth/AuthTransformer";

import IAuthService from "../../InterfaceAdapters/IServices/IAuthService";

import LoginUseCase from "../../Domain/UseCases/Auth/LoginUseCase";
import ChangeForgotPasswordUseCase from "../../Domain/UseCases/Auth/ChangeForgotPasswordUseCase";
import ForgotPasswordUseCase from "../../Domain/UseCases/Auth/ForgotPasswordUseCase";
import KeepAliveUseCase from "../../Domain/UseCases/Auth/KeepAliveUseCase";

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
        const _request = new AuthRequest(req);
        const loginUseCase = new LoginUseCase();

        const payload = await loginUseCase.handle(_request);

        this.responder.send(payload, res, StatusCode.HTTP_CREATED, new AuthTransformer());
    }

    @httpPost('/keepAlive', AuthorizeMiddleware(Permissions.AUTH_KEEP_ALIVE))
    public async keepAlive (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new KeepAliveRequest(req);
        const keepAliveUseCase = new KeepAliveUseCase();

        const payload = await keepAliveUseCase.handle(_request);

        this.responder.send(payload, res, StatusCode.HTTP_CREATED, new AuthTransformer());
    }

    @httpPost('/forgotPassword', ...ForgotPasswordRequest.validate(), ValidatorRules)
    public async forgotPassword (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new ForgotPasswordRequest(req);
        const forgotPasswordUseCase = new ForgotPasswordUseCase();

        const payload = await forgotPasswordUseCase.handle(_request);

        this.responder.send(payload, res, StatusCode.HTTP_CREATED, null);
    }

    @httpPost('/changeForgotPassword', ...ChangeForgotPasswordRequest.validate(), ValidatorRules)
    public async changeForgotPassword (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new ChangeForgotPasswordRequest(req);
        const changeForgotPasswordUseCase = new ChangeForgotPasswordUseCase();

        const payload = await changeForgotPasswordUseCase.handle(_request);

        this.responder.send(payload, res, StatusCode.HTTP_CREATED, null);
    }
}

export default AuthHandler;
