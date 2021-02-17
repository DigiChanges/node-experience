import {controller, httpPost, request, response, next, httpGet} from "inversify-express-utils";
import { NextFunction, Request, Response } from "express";
import {StatusCode} from "@digichanges/shared-experience";

import {inject} from "inversify";
import {TYPES} from "../../types";
import {SERVICES} from "../../services";
import Responder from "../Shared/Responder";

import AuthorizeMiddleware from "../Middlewares/AuthorizeMiddleware";
import Permissions from "../../Config/Permissions";

import AuthRequest from "../Requests/Handler/Auth/AuthRequest";
import ForgotPasswordRequest from "../Requests/Handler/Auth/ForgotPasswordRequest";
import ChangeForgotPasswordRequest from "../Requests/Handler/Auth/ChangeForgotPasswordRequest";
import KeepAliveRequest from "../Requests/Handler/Auth/KeepAliveRequest";

import AuthTransformer from "../Transformers/Auth/AuthTransformer";
import PermissionsTransformer from "../Transformers/Auth/PermissionsTransformer";

import IAuthService from "../../InterfaceAdapters/IServices/IAuthService";

import LoginUseCase from "../../Domain/UseCases/Auth/LoginUseCase";
import ChangeForgotPasswordUseCase from "../../Domain/UseCases/Auth/ChangeForgotPasswordUseCase";
import ForgotPasswordUseCase from "../../Domain/UseCases/Auth/ForgotPasswordUseCase";
import KeepAliveUseCase from "../../Domain/UseCases/Auth/KeepAliveUseCase";
import PermissionUseCase from "../../Domain/UseCases/Auth/PermissionUseCase";
import SyncRolesPermissionUseCase from "../../Domain/UseCases/Auth/SyncRolesPermissionUseCase";

import ValidatorRequest from "../../Application/Shared/ValidatorRequest";

@controller('/api/auth')
class AuthHandler
{
    @inject(SERVICES.IAuthService)
    private service: IAuthService;
    @inject(TYPES.Responder)
    private responder: Responder;

    @httpPost('/login')
    public async login (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new AuthRequest(req);
        await ValidatorRequest.handle(_request);

        const loginUseCase = new LoginUseCase();
        const payload = await loginUseCase.handle(_request);

        this.responder.send(payload, null, res, StatusCode.HTTP_CREATED, new AuthTransformer());
    }

    @httpPost('/keepAlive', AuthorizeMiddleware(Permissions.AUTH_KEEP_ALIVE))
    public async keepAlive (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new KeepAliveRequest(req);
        await ValidatorRequest.handle(_request);

        const keepAliveUseCase = new KeepAliveUseCase();
        const payload = await keepAliveUseCase.handle(_request);

        this.responder.send(payload, null, res, StatusCode.HTTP_CREATED, new AuthTransformer());
    }

    @httpPost('/forgotPassword')
    public async forgotPassword (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new ForgotPasswordRequest(req);
        await ValidatorRequest.handle(_request);

        const forgotPasswordUseCase = new ForgotPasswordUseCase();
        const payload = await forgotPasswordUseCase.handle(_request);

        this.responder.send(payload, null, res, StatusCode.HTTP_CREATED, null);
    }

    @httpPost('/changeForgotPassword')
    public async changeForgotPassword (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new ChangeForgotPasswordRequest(req);
        await ValidatorRequest.handle(_request);

        const changeForgotPasswordUseCase = new ChangeForgotPasswordUseCase();
        const payload = await changeForgotPasswordUseCase.handle(_request);

        this.responder.send(payload, null, res, StatusCode.HTTP_CREATED, null);
    }

    @httpGet('/permissions', AuthorizeMiddleware(Permissions.GET_PERMISSIONS))
    public async permissions (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const permissionUseCase = new PermissionUseCase();
        const payload = await permissionUseCase.handle();

        this.responder.send(payload, req, res, StatusCode.HTTP_OK, new PermissionsTransformer());
    }

    @httpPost('/syncRolesPermissions', AuthorizeMiddleware(Permissions.AUTH_SYNC_PERMISSIONS))
    public async syncRolesPermissions (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const syncRolesPermissionUseCase = new SyncRolesPermissionUseCase();
        await syncRolesPermissionUseCase.handle();

        this.responder.send({message: "Sync Successfully"}, req, res, StatusCode.HTTP_CREATED, null);
    }
}
