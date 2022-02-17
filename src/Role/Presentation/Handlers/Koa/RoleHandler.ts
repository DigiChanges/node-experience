import Koa from 'koa';
import Router from 'koa-router';
import { IPaginator, StatusCode } from '@digichanges/shared-experience';
import Responder from '../../../../App/Presentation/Shared/Koa/Responder';
import IdRequest from '../../../../App/Presentation/Requests/IdRequest';
import RoleRepRequest from '../../Requests/RoleRepRequest';
import IRoleDomain from '../../../InterfaceAdapters/IRoleDomain';
import RoleTransformer from '../../Transformers/RoleTransformer';
import RoleRequestCriteria from '../../Requests/RoleRequestCriteria';
import RoleUpdateRequest from '../../Requests/RoleUpdateRequest';
import RoleController from '../../Controllers/RoleController';
import AuthorizeMiddleware from '../../../../Auth/Presentation/Middlewares/Koa/AuthorizeMiddleware';
import Permissions from '../../../../Config/Permissions';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/roles'
};

const RoleHandler: Router = new Router(routerOpts);
const responder: Responder = new Responder();
const controller = new RoleController();

RoleHandler.post('/', AuthorizeMiddleware(Permissions.ROLES_SAVE), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new RoleRepRequest(ctx.request.body);

    const role: IRoleDomain = await controller.save(_request);

    void await responder.send(role, ctx, StatusCode.HTTP_CREATED, new RoleTransformer());
});

RoleHandler.get('/', AuthorizeMiddleware(Permissions.ROLES_LIST), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new RoleRequestCriteria(ctx.request.query, ctx.request.url);

    const paginator: IPaginator = await controller.list(_request);

    await responder.paginate(paginator, ctx, StatusCode.HTTP_OK, new RoleTransformer());
});

RoleHandler.get('/:id', AuthorizeMiddleware(Permissions.ROLES_SHOW), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new IdRequest(ctx.params.id);

    const role: IRoleDomain = await controller.getOne(_request);

    void await responder.send(role, ctx, StatusCode.HTTP_OK, new RoleTransformer());
});

RoleHandler.put('/:id', AuthorizeMiddleware(Permissions.ROLES_UPDATE), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new RoleUpdateRequest(ctx.request.body, ctx.params.id);

    const role: IRoleDomain = await controller.update(_request);

    void await responder.send(role, ctx, StatusCode.HTTP_CREATED, new RoleTransformer());
});

RoleHandler.delete('/:id', AuthorizeMiddleware(Permissions.ROLES_DELETE), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new IdRequest(ctx.params.id);

    const role: IRoleDomain = await controller.remove(_request);

    void await responder.send(role, ctx, StatusCode.HTTP_CREATED, new RoleTransformer());
});

export default RoleHandler;
