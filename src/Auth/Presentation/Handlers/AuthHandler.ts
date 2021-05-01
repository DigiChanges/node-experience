import {controller, httpPost, request, response, next, httpGet} from 'inversify-express-utils';
import {Request, Response} from 'express';
import {StatusCode} from '@digichanges/shared-experience';

import {inject} from 'inversify';
import {TYPES} from '../../../types';
import {SERVICES} from '../../../services';
import Responder from '../../../App/Presentation/Shared/Responder';

import AuthorizeMiddleware from '../Middlewares/AuthorizeMiddleware';
import Permissions from '../../../Config/Permissions';

import AuthRequest from '../Requests/AuthRequest';
import ForgotPasswordRequest from '../Requests/ForgotPasswordRequest';
import ChangeForgotPasswordRequest from '../Requests/ChangeForgotPasswordRequest';
import KeepAliveRequest from '../Requests/KeepAliveRequest';

import AuthTransformer from '../Transformers/AuthTransformer';
import PermissionsTransformer from '../Transformers/PermissionsTransformer';

import IAuthService from '../../InterfaceAdapters/IAuthService';

import LoginUseCase from '../../Domain/UseCases/LoginUseCase';
import ChangeForgotPasswordUseCase from '../../Domain/UseCases/ChangeForgotPasswordUseCase';
import ForgotPasswordUseCase from '../../Domain/UseCases/ForgotPasswordUseCase';
import KeepAliveUseCase from '../../Domain/UseCases/KeepAliveUseCase';
import PermissionUseCase from '../../Domain/UseCases/PermissionUseCase';
import SyncRolesPermissionUseCase from '../../Domain/UseCases/SyncRolesPermissionUseCase';

import ValidatorRequest from '../../../App/Presentation/Shared/ValidatorRequest';

@controller('/api/auth')
class AuthHandler
{
    @inject(SERVICES.IAuthService)
    private service: IAuthService;
    @inject(TYPES.Responder)
    private responder: Responder;

    @httpPost('/login')
    public async login(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new AuthRequest(req);
        await ValidatorRequest.handle(_request);

        const loginUseCase = new LoginUseCase();
        const payload = await loginUseCase.handle(_request);

        this.responder.send(payload, null, res, StatusCode.HTTP_CREATED, new AuthTransformer());
    }

    @httpPost('/keepAlive', AuthorizeMiddleware(Permissions.AUTH_KEEP_ALIVE))
    public async keepAlive(@request() req: Request, @response() res: Response)
    {
        const _request = new KeepAliveRequest(req);
        await ValidatorRequest.handle(_request);

        const keepAliveUseCase = new KeepAliveUseCase();
        const payload = await keepAliveUseCase.handle(_request);

        this.responder.send(payload, null, res, StatusCode.HTTP_CREATED, new AuthTransformer());
    }

    @httpPost('/forgotPassword')
    public async forgotPassword(@request() req: Request, @response() res: Response)
    {
        const _request = new ForgotPasswordRequest(req);
        await ValidatorRequest.handle(_request);

        const forgotPasswordUseCase = new ForgotPasswordUseCase();
        const payload = await forgotPasswordUseCase.handle(_request);

        this.responder.send(payload, null, res, StatusCode.HTTP_CREATED, null);
    }

    @httpPost('/changeForgotPassword')
    public async changeForgotPassword(@request() req: Request, @response() res: Response)
    {
        const _request = new ChangeForgotPasswordRequest(req);
        await ValidatorRequest.handle(_request);

        const changeForgotPasswordUseCase = new ChangeForgotPasswordUseCase();
        const payload = await changeForgotPasswordUseCase.handle(_request);

        this.responder.send(payload, null, res, StatusCode.HTTP_CREATED, null);
    }

    @httpGet('/permissions', AuthorizeMiddleware(Permissions.GET_PERMISSIONS))
    public permissions(@request() req: Request, @response() res: Response)
    {
        const permissionUseCase = new PermissionUseCase();
        const payload = permissionUseCase.handle();

        this.responder.send(payload, req, res, StatusCode.HTTP_OK, new PermissionsTransformer());
    }

    @httpPost('/syncRolesPermissions', AuthorizeMiddleware(Permissions.AUTH_SYNC_PERMISSIONS))
    public syncRolesPermissions(@request() req: Request, @response() res: Response)
    {
        const syncRolesPermissionUseCase = new SyncRolesPermissionUseCase();
        syncRolesPermissionUseCase.handle();

        this.responder.send({message: 'Sync Successfully'}, req, res, StatusCode.HTTP_CREATED, null);
    }
}
