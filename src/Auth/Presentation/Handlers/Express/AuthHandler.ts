import { controller, httpPost, request, response, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { StatusCode } from '@digichanges/shared-experience';

import { inject } from 'inversify';
import { TYPES } from '../../../../types';
import Responder from '../../../../App/Presentation/Shared/Express/Responder';

import AuthorizeMiddleware from '../../Middlewares/Express/AuthorizeMiddleware';
import Permissions from '../../../../Config/Permissions';

import AuthRequest from '../../Requests/Express/AuthRequest';
import ForgotPasswordRequest from '../../Requests/Express/ForgotPasswordRequest';
import ChangeForgotPasswordRequest from '../../Requests/Express/ChangeForgotPasswordRequest';
import KeepAliveRequest from '../../Requests/Express/KeepAliveRequest';

import AuthTransformer from '../../Transformers/AuthTransformer';
import PermissionsTransformer from '../../Transformers/PermissionsTransformer';

import AuthController from '../../Controllers/AuthController';

@controller('/api/auth')
class AuthHandler
{
    @inject(TYPES.Responder)
    private responder: Responder;
    private readonly controller: AuthController;

    constructor()
    {
        this.controller = new AuthController();
    }

    @httpPost('/login')
    public async login(@request() req: Request, @response() res: Response): Promise<void>
    {
        const _request = new AuthRequest(req.body);

        const payload = await this.controller.login(_request);

        this.responder.send(payload, null, res, StatusCode.HTTP_CREATED, new AuthTransformer());
    }

    @httpPost('/keep-alive', AuthorizeMiddleware(Permissions.AUTH_KEEP_ALIVE))
    public async keepAlive(@request() req: any, @response() res: Response)
    {
        const _request = new KeepAliveRequest(req.tokenDecode);

        const payload = await this.controller.keepAlive(_request);

        this.responder.send(payload, null, res, StatusCode.HTTP_CREATED, new AuthTransformer());
    }

    @httpPost('/forgot-password')
    public async forgotPassword(@request() req: Request, @response() res: Response)
    {
        const _request = new ForgotPasswordRequest(req.body);

        const payload = await this.controller.forgotPassword(_request);

        this.responder.send(payload, null, res, StatusCode.HTTP_CREATED, null);
    }

    @httpPost('/change-forgot-password')
    public async changeForgotPassword(@request() req: Request, @response() res: Response)
    {
        const _request = new ChangeForgotPasswordRequest(req.body);

        const payload = await this.controller.changeForgotPassword(_request);

        this.responder.send(payload, null, res, StatusCode.HTTP_CREATED, null);
    }

    @httpGet('/permissions', AuthorizeMiddleware(Permissions.GET_PERMISSIONS))
    public permissions(@request() req: Request, @response() res: Response)
    {
        const payload = this.controller.permissions();

        this.responder.send(payload, req, res, StatusCode.HTTP_OK, new PermissionsTransformer());
    }

    @httpPost('/sync-roles-permissions', AuthorizeMiddleware(Permissions.AUTH_SYNC_PERMISSIONS))
    public syncRolesPermissions(@request() req: Request, @response() res: Response)
    {
        this.controller.syncRolesPermissions();

        this.responder.send({ message: 'Sync Successfully' }, req, res, StatusCode.HTTP_CREATED, null);
    }
}
