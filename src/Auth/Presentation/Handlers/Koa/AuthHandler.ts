import Koa from 'koa';
import Router from 'koa-router';
import { StatusCode } from '@digichanges/shared-experience';
import Responder from '../../../../App/Presentation/Shared/Koa/Responder';
import AuthRequest from '../../Requests/Express/AuthRequest';
import AuthController from '../../Controllers/AuthController';
import AuthTransformer from '../../Transformers/AuthTransformer';
import KeepAliveRequest from '../../Requests/Express/KeepAliveRequest';
import ForgotPasswordRequest from '../../Requests/Express/ForgotPasswordRequest';
import ChangeForgotPasswordRequest from '../../Requests/Express/ChangeForgotPasswordRequest';
import PermissionsTransformer from '../../Transformers/PermissionsTransformer';
import Permissions from '../../../../Config/Permissions';
import AuthorizeMiddleware from '../../Middlewares/Koa/AuthorizeMiddleware';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/auth'
};

const AuthHandler: Router = new Router(routerOpts);
const responder: Responder = new Responder();
const controller = new AuthController();

AuthHandler.post('/login', async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new AuthRequest(ctx.request.body);

    const payload = await controller.login(_request);

    responder.send(payload, ctx, StatusCode.HTTP_CREATED, new AuthTransformer());
});

AuthHandler.post('/keep-alive', AuthorizeMiddleware(Permissions.AUTH_KEEP_ALIVE), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new KeepAliveRequest(ctx.tokenDecode);

    const payload = await controller.keepAlive(_request);

    await responder.send(payload, ctx, StatusCode.HTTP_OK, new AuthTransformer());
});

AuthHandler.post('/forgot-password', async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new ForgotPasswordRequest(ctx.request.body);

    const payload = await controller.forgotPassword(_request);

    responder.send(payload, ctx, StatusCode.HTTP_CREATED);
});

AuthHandler.post('/change-forgot-password', async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new ChangeForgotPasswordRequest(ctx.request.body);

    const payload = await controller.changeForgotPassword(_request);

    responder.send(payload, ctx, StatusCode.HTTP_CREATED);
});

AuthHandler.get('/permissions', AuthorizeMiddleware(Permissions.GET_PERMISSIONS), async(ctx: Koa.ParameterizedContext) =>
{
    const payload = controller.permissions();

    responder.send(payload, ctx, StatusCode.HTTP_OK, new PermissionsTransformer());
});

AuthHandler.post('/sync-roles-permissions', AuthorizeMiddleware(Permissions.AUTH_SYNC_PERMISSIONS), async(ctx: Koa.ParameterizedContext & any) =>
{
    controller.syncRolesPermissions();

    responder.send({ message: 'Sync Successfully' }, ctx, StatusCode.HTTP_CREATED);
});

export default AuthHandler;
