import Koa, { DefaultContext, DefaultContextExtends } from 'koa';
import Router from 'koa-router';
import dayjs from 'dayjs';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
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
import AuthPayload from '../../Domain/Payloads/Auth/AuthPayload';
import LogoutPayload from '../../Domain/Payloads/Auth/LogoutPayload';
import AuthHelperService from '../../Domain/Services/AuthHelperService';
import LoginUseCase from '../../Domain/UseCases/Auth/LoginUseCase';
import RegisterUseCase from '../../Domain/UseCases/Auth/RegisterUseCase';
import UpdateMeUseCase from '../../Domain/UseCases/Auth/UpdateMeUseCase';
import LogoutUseCase from '../../Domain/UseCases/Auth/LogoutUseCase';
import RefreshTokenUseCase from '../../Domain/UseCases/Auth/RefreshTokenUseCase';
import ForgotPasswordUseCase from '../../Domain/UseCases/Auth/ForgotPasswordUseCase';
import ChangeForgotPasswordUseCase from '../../Domain/UseCases/Auth/ChangeForgotPasswordUseCase';
import VerifyYourAccountUseCase from '../../Domain/UseCases/Auth/VerifyYourAccountUseCase';
import PermissionUseCase from '../../Domain/UseCases/Auth/PermissionUseCase';
import IGroupPermission from '../../../Config/IGroupPermission';
import SyncPermissionsUseCase from '../../Domain/UseCases/Auth/SyncPermissionsUseCase';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/auth'
};

const AuthKoaHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();
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

    const useCase = new UpdateMeUseCase();
    const payload = await useCase.handle(data);

    void await responder.send(payload, ctx, config['HTTP_CREATED'], new UserTransformer());
});

AuthKoaHandler.post('/login', async(ctx: Koa.ParameterizedContext & any) =>
{
    const data = {
        ...ctx.request.body
    };

    const useCase = new LoginUseCase();
    const payload = await useCase.handle(data as AuthPayload);

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

    const useCase = new RegisterUseCase();
    const payload = await useCase.handle(data);

    void await responder.send(payload, ctx, config['HTTP_CREATED'], new DefaultTransformer());
});

AuthKoaHandler.post('/logout', async(ctx: Koa.ParameterizedContext & any) =>
{
    const data: LogoutPayload = {
        token: (new AuthHelperService()).getToken(ctx.get('Authorization'))
    };

    const useCase = new LogoutUseCase();
    const payload = await useCase.handle(data);

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

    const useCase = new RefreshTokenUseCase();
    const payload = await useCase.handle(data);

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

    const useCase = new ForgotPasswordUseCase();
    const payload = await useCase.handle(data);

    void await responder.send(payload, ctx, config['HTTP_CREATED']);
});

AuthKoaHandler.post('/change-forgot-password', async(ctx: Koa.ParameterizedContext & any) =>
{
    const useCase = new ChangeForgotPasswordUseCase();
    const payload = await useCase.handle(ctx.request.body);

    void await responder.send(payload, ctx, config['HTTP_CREATED']);
});

AuthKoaHandler.put('/verify-your-account/:confirmationToken', async(ctx: Koa.ParameterizedContext & any) =>
{
    const useCase = new VerifyYourAccountUseCase();
    const payload = await useCase.handle(ctx.params);

    void await responder.send(payload, ctx, config['HTTP_CREATED'], new DefaultTransformer());
});

AuthKoaHandler.get('/permissions', AuthorizeKoaMiddleware(Permissions.AUTH_GET_PERMISSIONS), async(ctx: Koa.ParameterizedContext) =>
{
    const useCase = new PermissionUseCase();
    const payload: IGroupPermission[] = useCase.handle();

    void await responder.send(payload, ctx, config['HTTP_OK'], new PermissionsTransformer());
});

AuthKoaHandler.post('/sync-roles-permissions', AuthorizeKoaMiddleware(Permissions.AUTH_SYNC_PERMISSIONS), async(ctx: Koa.ParameterizedContext) =>
{
    const useCase = new SyncPermissionsUseCase();
    await useCase.handle();

    void await responder.send({ message: 'Sync Successfully' }, ctx, config['HTTP_CREATED']);
});

export default AuthKoaHandler;
