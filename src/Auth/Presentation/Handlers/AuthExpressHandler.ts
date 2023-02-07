import { controller, httpGet, httpPost, httpPut, request, response } from 'inversify-express-utils';
import { Response } from 'express';

import ExpressResponder from '../../../Shared/Application/Http/ExpressResponder';

import AuthorizeExpressMiddleware from '../Middlewares/AuthorizeExpressMiddleware';
import Permissions from '../../../Config/Permissions';

import AuthTransformer from '../Transformers/AuthTransformer';
import PermissionsTransformer from '../Transformers/PermissionsTransformer';

import AuthController from '../Controllers/AuthController';
import { AuthUser } from '../Helpers/AuthUser';
import UserTransformer from '../Transformers/UserTransformer';
import dayjs from 'dayjs';
import DefaultTransformer from '../../../Shared/Presentation/Transformers/DefaultTransformer';
import RefreshTokenExpressMiddleware from '../Middlewares/RefreshTokenExpressMiddleware';
import MainConfig, { IHttpStatusCode } from '../../../Config/MainConfig';
import UpdateMePayload from '../../Domain/Payloads/Auth/UpdateMePayload';
import AuthPayload from '../../Domain/Payloads/Auth/AuthPayload';
import RegisterPayload from '../../Domain/Payloads/Auth/RegisterPayload';
import RefreshTokenPayload from '../../Domain/Payloads/Auth/RefreshTokenPayload';
import ForgotPasswordPayload from '../../Domain/Payloads/Auth/ForgotPasswordPayload';
import ChangeForgotPasswordPayload from '../../Domain/Payloads/Auth/ChangeForgotPasswordPayload';
import VerifyYourAccountPayload from '../../Domain/Payloads/Auth/VerifyYourAccountPayload';

@controller('/api/auth')
class AuthExpressHandler
{
    private responder: ExpressResponder;
    private controller: AuthController;
    private config: Record<string, IHttpStatusCode>;

    constructor()
    {
        this.responder = new ExpressResponder();
        this.controller = new AuthController();
        this.config = MainConfig.getInstance().getConfig().statusCode;
    }

    @httpGet('/me')
    public async me(@request() req: any, @response() res: Response): Promise<void>
    {
        void await this.responder.send(AuthUser(req), null, res, this.config['HTTP_OK'], new UserTransformer());
    }

    @httpPut('/me')
    public async updateMe(@request() req: any, @response() res: Response): Promise<void>
    {
        const data = {
            authUser: AuthUser(req),
            ...req.body
        };

        const payload = await this.controller.updateMe(data as UpdateMePayload);

        void await this.responder.send(payload, req, res, this.config['HTTP_OK'], new UserTransformer());
    }

    @httpPost('/login')
    public async login(@request() req: any, @response() res: Response): Promise<void>
    {
        const payload = await this.controller.login(req.body as AuthPayload);

        res.cookie(
            'refreshToken',
            payload.getRefreshHash(),
            {
                expires: dayjs.unix(payload.getExpires()).toDate(),
                maxAge: payload.getExpires(),
                path: '/api/auth',
                secure: MainConfig.getInstance().getConfig().app.setCookieSecure,
                httpOnly: true,
                sameSite: MainConfig.getInstance().getConfig().app.setCookieSameSite as any
            });

        void await this.responder.send(payload, req, res, this.config['HTTP_CREATED'], new AuthTransformer());
    }

    @httpPost('/signup')
    public async register(@request() req: any, @response() res: Response): Promise<void>
    {
        const data = {
            ...req.body,
            birthday: dayjs(req.body.birthday, 'yyyy-mm-dd').toDate(),
            roles: []
        };

        const payload = await this.controller.register(req.body as RegisterPayload);

        void await this.responder.send(payload, req, res, this.config['HTTP_CREATED'], new DefaultTransformer());
    }

    @httpPost('/logout')
    public async logout(@request() req: any, @response() res: Response)
    {
        const data: RefreshTokenPayload = {
            refreshToken: req.refreshToken,
            decodeToken: AuthUser(req, 'decodeToken')
        };

        const payload = await this.controller.logout(data);

        res.cookie(
            'refreshToken',
            null,
            {
                expires: dayjs.unix(0).toDate(),
                maxAge: 0,
                path: '/api/auth',
                secure: MainConfig.getInstance().getConfig().app.setCookieSecure,
                httpOnly: true,
                sameSite: MainConfig.getInstance().getConfig().app.setCookieSameSite as any
            });

        void await this.responder.send(payload, req, res, this.config['HTTP_CREATED'], new DefaultTransformer());
    }

    @httpPost('/refresh-token', void RefreshTokenExpressMiddleware)
    public async refreshToken(@request() req: any, @response() res: Response)
    {
        const payload = await this.controller.refreshToken(req as RefreshTokenPayload);

        res.cookie(
            'refreshToken',
            payload.getRefreshHash(),
            {
                expires: dayjs.unix(payload.getExpires()).toDate(),
                maxAge: payload.getExpires(),
                path: '/api/auth',
                secure: MainConfig.getInstance().getConfig().app.setCookieSecure,
                httpOnly: true,
                sameSite: MainConfig.getInstance().getConfig().app.setCookieSameSite as any
            });

        void await this.responder.send(payload, req, res, this.config['HTTP_CREATED'], new AuthTransformer());
    }

    @httpPost('/forgot-password')
    public async forgotPassword(@request() req: any, @response() res: Response)
    {
        const data: ForgotPasswordPayload = {
            email: req.body.email,
            confirmationToken: req.body.confirmationToken,
            passwordRequestedAt: dayjs().toDate()
        };

        const payload = await this.controller.forgotPassword(data);

        void await this.responder.send(payload, req, res, this.config['HTTP_CREATED']);
    }

    @httpPost('/change-forgot-password')
    public async changeForgotPassword(@request() req: any, @response() res: Response)
    {
        const payload = await this.controller.changeForgotPassword(req.body as ChangeForgotPasswordPayload);

        void await this.responder.send(payload, req, res, this.config['HTTP_CREATED']);
    }

    @httpPut('/verify-your-account/:confirmationToken')
    public async verifyYourAccount(@request() req: any, @response() res: Response)
    {
        const payload = await this.controller.verifyYourAccount(req.params as VerifyYourAccountPayload);

        void await this.responder.send(payload, req, res, this.config['HTTP_CREATED'], new DefaultTransformer());
    }

    @httpGet('/permissions', void AuthorizeExpressMiddleware(Permissions.GET_PERMISSIONS))
    public async permissions(@request() req: any, @response() res: Response)
    {
        const payload = this.controller.permissions();

        void await this.responder.send(payload, req, res, this.config['HTTP_OK'], new PermissionsTransformer());
    }

    @httpPost('/sync-roles-permissions', void AuthorizeExpressMiddleware(Permissions.AUTH_SYNC_PERMISSIONS))
    public async syncRolesPermissions(@request() req: any, @response() res: Response)
    {
        await this.controller.syncRolesPermissions();

        void await this.responder.send({ message: 'Sync Successfully' }, req, res, this.config['HTTP_CREATED']);
    }
}
