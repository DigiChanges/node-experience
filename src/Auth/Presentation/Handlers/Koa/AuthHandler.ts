import Koa from 'koa';
import Router from 'koa-router';
import { StatusCode } from '@digichanges/shared-experience';
import Responder from '../../../../App/Presentation/Shared/Koa/Responder';
import AuthRequest from '../../Requests/AuthRequest';
import AuthController from '../../Controllers/AuthController';
import AuthTransformer from '../../Transformers/AuthTransformer';
import RefreshTokenRequest from '../../Requests/RefreshTokenRequest';
import ForgotPasswordRequest from '../../Requests/ForgotPasswordRequest';
import ChangeForgotPasswordRequest from '../../Requests/ChangeForgotPasswordRequest';
import PermissionsTransformer from '../../Transformers/PermissionsTransformer';
import Permissions from '../../../../Config/Permissions';
import AuthorizeMiddleware from '../../Middlewares/Koa/AuthorizeMiddleware';
import { AuthUser } from '../../Helpers/AuthUser';
import UserTransformer from '../../../../User/Presentation/Transformers/UserTransformer';
import moment from 'moment';
import DefaultTransformer from '../../../../App/Presentation/Transformers/DefaultTransformer';
import RegisterRequest from '../../Requests/RegisterRequest';
import UpdateMeRequest from '../../Requests/UpdateMeRequest';
import VerifyYourAccountRequest from '../../Requests/VerifyYourAccountRequest';
import RefreshTokenMiddleware from '../../Middlewares/Koa/RefreshTokenMiddleware';
import MainConfig from '../../../../Config/mainConfig';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/auth'
};

const AuthHandler: Router = new Router(routerOpts);
const responder: Responder = new Responder();
const controller = new AuthController();

AuthHandler.get('/me', async(ctx: Koa.ParameterizedContext & any) =>
{
    void await responder.send(AuthUser(ctx), ctx, StatusCode.HTTP_OK, new UserTransformer());
});

AuthHandler.put('/me', async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new UpdateMeRequest(ctx.request.body);

    const payload = await controller.updateMe(_request, AuthUser(ctx));

    void await responder.send(payload, ctx, StatusCode.HTTP_CREATED, new UserTransformer());
});

AuthHandler.post('/login', async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new AuthRequest(ctx.request.body);

    const payload = await controller.login(_request);

    ctx.cookies.set(
        'refreshToken',
        payload.getRefreshHash(),
        {
            expires: moment.unix(payload.getExpires()).toDate(),
            maxAge: payload.getExpires(),
            path: '/api/auth/refresh-token',
            secure: MainConfig.getInstance().getConfig().setCookieSecure,
            httpOnly: true,
            sameSite: MainConfig.getInstance().getConfig().setCookieSameSite
        });

    void await responder.send(payload, ctx, StatusCode.HTTP_CREATED, new AuthTransformer());
});

AuthHandler.post('/signup', async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new RegisterRequest(ctx.request.body);

    const payload = await controller.register(_request);

    void await responder.send(payload, ctx, StatusCode.HTTP_CREATED, new DefaultTransformer());
});

AuthHandler.post('/logout', async(ctx: Koa.ParameterizedContext & any) =>
{
    const payload = await controller.logout(AuthUser(ctx, 'tokenDecode'));

    ctx.cookies.set('refreshToken', null);

    void await responder.send(payload, ctx, StatusCode.HTTP_OK, new DefaultTransformer());
});

AuthHandler.post('/refresh-token', RefreshTokenMiddleware, async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new RefreshTokenRequest(ctx.refreshToken);

    const payload = await controller.refreshToken(_request);

    ctx.cookies.set(
        'refreshToken',
        payload.getRefreshHash(),
        {
            expires: moment.unix(payload.getExpires()).toDate(),
            maxAge: payload.getExpires(),
            path: '/api/auth/refresh-token',
            secure: MainConfig.getInstance().getConfig().setCookieSecure,
            httpOnly: true,
            sameSite: MainConfig.getInstance().getConfig().setCookieSameSite
        });

    void await responder.send(payload, ctx, StatusCode.HTTP_OK, new AuthTransformer());
});

AuthHandler.post('/forgot-password', async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new ForgotPasswordRequest(ctx.request.body);

    const payload = await controller.forgotPassword(_request);

    void await responder.send(payload, ctx, StatusCode.HTTP_CREATED);
});

AuthHandler.post('/change-forgot-password', async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new ChangeForgotPasswordRequest(ctx.request.body);

    const payload = await controller.changeForgotPassword(_request);

    void await responder.send(payload, ctx, StatusCode.HTTP_CREATED);
});

AuthHandler.put('/verify-your-account/:confirmationToken', async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new VerifyYourAccountRequest(ctx.params.confirmationToken);

    const payload = await controller.verifyYourAccount(_request);

    void await responder.send(payload, ctx, StatusCode.HTTP_CREATED, new DefaultTransformer());
});

AuthHandler.get('/permissions', AuthorizeMiddleware(Permissions.GET_PERMISSIONS), async(ctx: Koa.ParameterizedContext) =>
{
    const payload = controller.permissions();

    void await responder.send(payload, ctx, StatusCode.HTTP_OK, new PermissionsTransformer());
});

AuthHandler.post('/sync-roles-permissions', AuthorizeMiddleware(Permissions.AUTH_SYNC_PERMISSIONS), async(ctx: Koa.ParameterizedContext & any) =>
{
    controller.syncRolesPermissions();

    void await responder.send({ message: 'Sync Successfully' }, ctx, StatusCode.HTTP_CREATED);
});

export default AuthHandler;
