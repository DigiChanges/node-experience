import Koa from 'koa';
import Router from 'koa-router';
import dayjs from 'dayjs';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import AuthRequest from '../Requests/AuthRequest';
import AuthController from '../Controllers/AuthController';
import AuthTransformer from '../Transformers/AuthTransformer';
import RefreshTokenRequest from '../Requests/RefreshTokenRequest';
import ForgotPasswordRequest from '../Requests/ForgotPasswordRequest';
import ChangeForgotPasswordRequest from '../Requests/ChangeForgotPasswordRequest';
import PermissionsTransformer from '../Transformers/PermissionsTransformer';
import Permissions from '../../../Config/Permissions';
import AuthorizeKoaMiddleware from '../Middlewares/AuthorizeKoaMiddleware';
import { AuthUser } from '../Helpers/AuthUser';
import UserTransformer from '../../../User/Presentation/Transformers/UserTransformer';
import DefaultTransformer from '../../../Shared/Presentation/Transformers/DefaultTransformer';
import RegisterRequest from '../Requests/RegisterRequest';
import UpdateMeRequest from '../Requests/UpdateMeRequest';
import VerifyYourAccountRequest from '../Requests/VerifyYourAccountRequest';
import RefreshTokenKoaMiddleware from '../Middlewares/RefreshTokenKoaMiddleware';
import MainConfig from '../../../Config/MainConfig';
import StatusCode from '../../../Shared/Application/StatusCode';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/auth'
};

const AuthKoaHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();
const controller = new AuthController();

AuthKoaHandler.get('/me', async(ctx: Koa.ParameterizedContext & any) =>
{
    void await responder.send(AuthUser(ctx), ctx, StatusCode.HTTP_OK, new UserTransformer());
});

AuthKoaHandler.put('/me', async(ctx: Koa.ParameterizedContext & any) =>
{
    const data = {
        authUser: AuthUser(ctx),
        ...ctx.request.body
    };

    const _request = new UpdateMeRequest(data);

    const payload = await controller.updateMe(_request);

    void await responder.send(payload, ctx, StatusCode.HTTP_CREATED, new UserTransformer());
});

AuthKoaHandler.post('/login', async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new AuthRequest(ctx.request.body);

    const payload = await controller.login(_request);

    ctx.cookies.set(
        'refreshToken',
        payload.getRefreshHash(),
        {
            expires: dayjs.unix(payload.getExpires()).toDate(),
            maxAge: payload.getExpires(),
            path: '/api/auth',
            secure: MainConfig.getInstance().getConfig().setCookieSecure,
            httpOnly: true,
            sameSite: MainConfig.getInstance().getConfig().setCookieSameSite
        });

    void await responder.send(payload, ctx, StatusCode.HTTP_CREATED, new AuthTransformer());
});

AuthKoaHandler.post('/signup', async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new RegisterRequest(ctx.request.body);

    const payload = await controller.register(_request);

    void await responder.send(payload, ctx, StatusCode.HTTP_CREATED, new DefaultTransformer());
});

AuthKoaHandler.post('/logout', async(ctx: Koa.ParameterizedContext & any) =>
{
    const data = {
        refreshToken: ctx.refreshToken,
        decodeToken: AuthUser(ctx, 'decodeToken')
    };

    const _request = new RefreshTokenRequest(data);

    const payload = await controller.logout(_request);

    ctx.cookies.set(
        'refreshToken',
        null,
        {
            expires: dayjs.unix(0).toDate(),
            maxAge: 0,
            path: '/api/auth',
            secure: MainConfig.getInstance().getConfig().setCookieSecure,
            httpOnly: true,
            sameSite: MainConfig.getInstance().getConfig().setCookieSameSite
        });

    void await responder.send(payload, ctx, StatusCode.HTTP_OK, new DefaultTransformer());
});

AuthKoaHandler.post('/refresh-token', RefreshTokenKoaMiddleware, async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new RefreshTokenRequest(ctx);

    const payload = await controller.refreshToken(_request);

    ctx.cookies.set(
        'refreshToken',
        payload.getRefreshHash(),
        {
            expires: dayjs.unix(payload.getExpires()).toDate(),
            maxAge: payload.getExpires(),
            path: '/api/auth',
            secure: MainConfig.getInstance().getConfig().setCookieSecure,
            httpOnly: true,
            sameSite: MainConfig.getInstance().getConfig().setCookieSameSite
        });

    void await responder.send(payload, ctx, StatusCode.HTTP_OK, new AuthTransformer());
});

AuthKoaHandler.post('/forgot-password', async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new ForgotPasswordRequest(ctx.request.body);

    const payload = await controller.forgotPassword(_request);

    void await responder.send(payload, ctx, StatusCode.HTTP_CREATED);
});

AuthKoaHandler.post('/change-forgot-password', async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new ChangeForgotPasswordRequest(ctx.request.body);

    const payload = await controller.changeForgotPassword(_request);

    void await responder.send(payload, ctx, StatusCode.HTTP_CREATED);
});

AuthKoaHandler.put('/verify-your-account/:confirmationToken', async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new VerifyYourAccountRequest(ctx.params.confirmationToken);

    const payload = await controller.verifyYourAccount(_request);

    void await responder.send(payload, ctx, StatusCode.HTTP_CREATED, new DefaultTransformer());
});

AuthKoaHandler.get('/permissions', AuthorizeKoaMiddleware(Permissions.GET_PERMISSIONS), async(ctx: Koa.ParameterizedContext) =>
{
    const payload = controller.permissions();

    void await responder.send(payload, ctx, StatusCode.HTTP_OK, new PermissionsTransformer());
});

AuthKoaHandler.post('/sync-roles-permissions', AuthorizeKoaMiddleware(Permissions.AUTH_SYNC_PERMISSIONS), async(ctx: Koa.ParameterizedContext & any) =>
{
    controller.syncRolesPermissions();

    void await responder.send({ message: 'Sync Successfully' }, ctx, StatusCode.HTTP_CREATED);
});

export default AuthKoaHandler;
