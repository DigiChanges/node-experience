import Koa from 'koa';
import Router from 'koa-router';
import StatusCode from '../../../Shared/Application/StatusCode';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import IdRequest from '../../../Shared/Presentation/Requests/IdRequest';
import RoleRepRequest from '../Requests/Role/RoleRepRequest';
import IRoleDomain from '../../Domain/Entities/IRoleDomain';
import RoleTransformer from '../Transformers/RoleTransformer';
import RoleRequestCriteria from '../Requests/Role/RoleRequestCriteria';
import RoleUpdateRequest from '../Requests/Role/RoleUpdateRequest';
import RoleController from '../Controllers/RoleController';
import AuthorizeKoaMiddleware from '../Middlewares/AuthorizeKoaMiddleware';
import Permissions from '../../../Config/Permissions';
import ResponseMessageEnum from '../../../Shared/Domain/Enum/ResponseMessageEnum';
import DefaultMessageTransformer from '../../../Shared/Presentation/Transformers/DefaultMessageTransformer';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/roles'
};

const RoleKoaHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();
const controller = new RoleController();

RoleKoaHandler.post('/', AuthorizeKoaMiddleware(Permissions.ROLES_SAVE), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new RoleRepRequest(ctx.request.body);

    const role: IRoleDomain = await controller.save(_request);

    void await responder.send(role, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
});

RoleKoaHandler.get('/', AuthorizeKoaMiddleware(Permissions.ROLES_LIST), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new RoleRequestCriteria(ctx.request.query, ctx.request.url);

    const paginator: IPaginator = await controller.list(_request);

    await responder.paginate(paginator, ctx, StatusCode.HTTP_OK, new RoleTransformer());
});

RoleKoaHandler.get('/:id', AuthorizeKoaMiddleware(Permissions.ROLES_SHOW), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new IdRequest({ id: ctx.params.id });

    const role: IRoleDomain = await controller.getOne(_request);

    void await responder.send(role, ctx, StatusCode.HTTP_OK, new RoleTransformer());
});

RoleKoaHandler.put('/:id', AuthorizeKoaMiddleware(Permissions.ROLES_UPDATE), async(ctx: Koa.ParameterizedContext & any) =>
{
    const data = {
        id: ctx.params.id,
        ...ctx.request.body
    };

    const _request = new RoleUpdateRequest(data);

    const role: IRoleDomain = await controller.update(_request);

    void await responder.send(role, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
});

RoleKoaHandler.delete('/:id', AuthorizeKoaMiddleware(Permissions.ROLES_DELETE), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new IdRequest({ id: ctx.params.id });

    const role: IRoleDomain = await controller.remove(_request);

    void await responder.send(role, ctx, StatusCode.HTTP_CREATED, new RoleTransformer());
});

export default RoleKoaHandler;
