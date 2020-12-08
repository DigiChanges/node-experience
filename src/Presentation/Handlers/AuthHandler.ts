import { controller, httpPost, request, response, next } from "inversify-express-utils";
import { NextFunction, Request, Response } from "express";

import {lazyInject } from "../../inversify.config";
import {TYPES} from "../../types";
import {SERVICES} from "../../services";
import StatusCode from "../Shared/StatusCode";
import Responder from "../Shared/Responder";

import AuthorizeMiddleware from "../Middlewares/AuthorizeMiddleware";
import Permissions from "../../../config/Permissions";

import AuthRequest from "../Requests/Handler/Auth/AuthRequest";
import ForgotPasswordRequest from "../Requests/Handler/Auth/ForgotPasswordRequest";
import ChangeForgotPasswordRequest from "../Requests/Handler/Auth/ChangeForgotPasswordRequest";
import KeepAliveRequest from "../Requests/Handler/Auth/KeepAliveRequest";
import AuthTransformer from "../Transformers/Auth/AuthTransformer";

import IAuthService from "../../InterfaceAdapters/IServices/IAuthService";

import LoginUseCase from "../../Domain/UseCases/Auth/LoginUseCase";
import ChangeForgotPasswordUseCase from "../../Domain/UseCases/Auth/ChangeForgotPasswordUseCase";
import ForgotPasswordUseCase from "../../Domain/UseCases/Auth/ForgotPasswordUseCase";
import KeepAliveUseCase from "../../Domain/UseCases/Auth/KeepAliveUseCase";

import ValidatorRequest from "../../Application/Shared/ValidatorRequest";

@controller('/api/auth')
class AuthHandler
{
    @lazyInject(SERVICES.IAuthService)
    private service: IAuthService;
    @lazyInject(TYPES.Responder)
    private responder: Responder;

    @httpPost('/login')
    public async login (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new AuthRequest(req);
        await ValidatorRequest.handle(_request);

        const loginUseCase = new LoginUseCase();
        const payload = await loginUseCase.handle(_request);

        this.responder.send(payload, res, StatusCode.HTTP_CREATED, new AuthTransformer());
    }

    @httpPost('/keepAlive', AuthorizeMiddleware(Permissions.AUTH_KEEP_ALIVE))
    public async keepAlive (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new KeepAliveRequest(req);
        await ValidatorRequest.handle(_request);

        const keepAliveUseCase = new KeepAliveUseCase();
        const payload = await keepAliveUseCase.handle(_request);

        this.responder.send(payload, res, StatusCode.HTTP_CREATED, new AuthTransformer());
    }

    @httpPost('/forgotPassword')
    public async forgotPassword (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new ForgotPasswordRequest(req);
        await ValidatorRequest.handle(_request);

        const forgotPasswordUseCase = new ForgotPasswordUseCase();
        const payload = await forgotPasswordUseCase.handle(_request);

        this.responder.send(payload, res, StatusCode.HTTP_CREATED, null);
    }

    @httpPost('/changeForgotPassword')
    public async changeForgotPassword (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new ChangeForgotPasswordRequest(req);
        await ValidatorRequest.handle(_request);

        const changeForgotPasswordUseCase = new ChangeForgotPasswordUseCase();
        const payload = await changeForgotPasswordUseCase.handle(_request);

        this.responder.send(payload, res, StatusCode.HTTP_CREATED, null);
    }
}

export default AuthHandler;
