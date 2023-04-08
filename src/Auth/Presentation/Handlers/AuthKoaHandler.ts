import Koa, { DefaultContext, DefaultContextExtends } from 'koa';
import Router from 'koa-router';
import dayjs from 'dayjs';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import AuthController from '../Controllers/AuthController';
import AuthTransformer from '../Transformers/AuthTransformer';
import PermissionsTransformer from '../Transformers/PermissionsTransformer';
import Permissions from '../../../Config/Permissions';
import AuthorizeKoaMiddleware from '../Middlewares/AuthorizeKoaMiddleware';
import { AuthUser } from '../Helpers/AuthUser';
import UserTransformer from '../Transformers/UserTransformer';
import DefaultTransformer from '../../../Shared/Presentation/Transformers/DefaultTransformer';
import MainConfig from '../../../Config/MainConfig';
import ForgotPasswordPayload from '../../Domain/Payloads/Auth/ForgotPasswordPayload';
import RefreshTokenPayload from '../../Domain/Payloads/Auth/RefreshTokenPayload';
import RegisterPayload from '../../Domain/Payloads/Auth/RegisterPayload';
import UpdateMePayload from '../../Domain/Payloads/Auth/UpdateMePayload';
import AuthPayload from '../../Domain/Payloads/Auth/AuthPayload';
import LogoutPayload from '../../Domain/Payloads/Auth/LogoutPayload';
import AuthHelperService from '../../Domain/Services/AuthHelperService';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/auth'
};

const AuthKoaHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();
const controller = new AuthController();
const config = MainConfig.getInstance().getConfig().statusCode;

AuthKoaHandler.get('/me', AuthorizeKoaMiddleware(Permissions.AUTH_GET_ME), async(ctx: DefaultContextExtends) =>
{
    void await responder.send(AuthUser(ctx), ctx as DefaultContext, config['HTTP_OK'], new UserTransformer());
});

AuthKoaHandler.put('/me', AuthorizeKoaMiddleware(Permissions.AUTH_GET_ME), async(ctx: Koa.ParameterizedContext & any) =>
{
    const data = {
        ...ctx.request.body,
        authUser: AuthUser(ctx),
        birthdate: dayjs(ctx.request.body.birthdate, 'yyyy-mm-dd').toDate()
    };

    const payload = await controller.updateMe(data as UpdateMePayload);

    void await responder.send(payload, ctx, config['HTTP_CREATED'], new UserTransformer());
});

AuthKoaHandler.post('/login', async(ctx: Koa.ParameterizedContext & any) =>
{
    const data = {
        ...ctx.request.body
    };

    const payload = await controller.login(data as AuthPayload);

    ctx.cookies.set(
        'refreshToken',
        payload.refreshToken,
        {
            expires: dayjs().add(payload.refreshExpiresIn, 'second').toDate(),
            maxAge: payload.refreshExpiresIn,
            path: '/api/auth',
            secure: MainConfig.getInstance().getConfig().app.setCookieSecure,
            httpOnly: false,
            sameSite: MainConfig.getInstance().getConfig().app.setCookieSameSite
        }
    );

    void await responder.send(payload, ctx, config['HTTP_CREATED'], new AuthTransformer());
});

AuthKoaHandler.post('/signup', async(ctx: Koa.ParameterizedContext & any) =>
{
    const data = {
        ...ctx.request.body,
        birthdate: dayjs(ctx.request.body.birthdate, 'yyyy-mm-dd').toDate()
    };

    const payload = await controller.register(data as RegisterPayload);

    void await responder.send(payload, ctx, config['HTTP_CREATED'], new DefaultTransformer());
});

AuthKoaHandler.post('/logout', async(ctx: Koa.ParameterizedContext & any) =>
{
    const data: LogoutPayload = {
        token: (new AuthHelperService()).getToken(ctx.get('Authorization'))
    };

    const payload = await controller.logout(data);

    ctx.cookies.set(
        'refreshToken',
        null,
        {
            expires: dayjs.unix(0).toDate(),
            maxAge: 0,
            path: '/api/auth',
            secure: MainConfig.getInstance().getConfig().app.setCookieSecure,
            httpOnly: true,
            sameSite: MainConfig.getInstance().getConfig().app.setCookieSameSite
        });

    void await responder.send(payload, ctx, config['HTTP_OK'], new DefaultTransformer());
});

AuthKoaHandler.post('/refresh-token', async(ctx: Koa.ParameterizedContext & any) =>
{
    const data: RefreshTokenPayload = {
        refreshToken: (new AuthHelperService()).getToken(ctx.get('Authorization'))
    };

    const payload = await controller.refreshToken(data);

    ctx.cookies.set(
        'refreshToken',
        payload.refreshToken,
        {
            expires: dayjs().add(payload.refreshExpiresIn, 'second').toDate(),
            maxAge: payload.refreshExpiresIn,
            path: '/api/auth',
            secure: MainConfig.getInstance().getConfig().app.setCookieSecure,
            httpOnly: false,
            sameSite: MainConfig.getInstance().getConfig().app.setCookieSameSite
        }
    );

    void await responder.send(payload, ctx, config['HTTP_OK'], new AuthTransformer());
});

AuthKoaHandler.post('/forgot-password', async(ctx: Koa.ParameterizedContext & any) =>
{
    const data: ForgotPasswordPayload = {
        email: ctx.request.body.email
    };

    const payload = await controller.forgotPassword(data);

    void await responder.send(payload, ctx, config['HTTP_CREATED']);
});

AuthKoaHandler.post('/change-forgot-password', async(ctx: Koa.ParameterizedContext & any) =>
{
    const payload = await controller.changeForgotPassword(ctx.request.body);

    void await responder.send(payload, ctx, config['HTTP_CREATED']);
});

AuthKoaHandler.put('/verify-your-account/:confirmationToken', async(ctx: Koa.ParameterizedContext & any) =>
{
    const payload = await controller.verifyYourAccount(ctx.params);

    void await responder.send(payload, ctx, config['HTTP_CREATED'], new DefaultTransformer());
});

AuthKoaHandler.get('/permissions', AuthorizeKoaMiddleware(Permissions.AUTH_GET_PERMISSIONS), async(ctx: Koa.ParameterizedContext) =>
{
    const payload = controller.permissions();

    void await responder.send(payload, ctx, config['HTTP_OK'], new PermissionsTransformer());
});

AuthKoaHandler.post('/sync-roles-permissions', AuthorizeKoaMiddleware(Permissions.AUTH_SYNC_PERMISSIONS), async(ctx: Koa.ParameterizedContext) =>
{
    await controller.syncRolesPermissions();

    void await responder.send({ message: 'Sync Successfully' }, ctx, config['HTTP_CREATED']);
});

export default AuthKoaHandler;
