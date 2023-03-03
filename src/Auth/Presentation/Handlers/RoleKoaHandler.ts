import { DefaultContext } from 'koa';
import Router from 'koa-router';
import StatusCode from '../../../Shared/Application/StatusCode';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import IRoleDomain from '../../Domain/Entities/IRoleDomain';
import RoleTransformer from '../Transformers/RoleTransformer';
import RoleController from '../Controllers/RoleController';
import AuthorizeKoaMiddleware from '../Middlewares/AuthorizeKoaMiddleware';
import Permissions from '../../../Config/Permissions';
import ResponseMessageEnum from '../../../Shared/Domain/Enum/ResponseMessageEnum';
import DefaultMessageTransformer from '../../../Shared/Presentation/Transformers/DefaultMessageTransformer';
import RoleRepPayload from '../../Domain/Payloads/Role/RoleRepPayload';
import CriteriaPayload from '../../../Shared/Presentation/Validations/CriteriaPayload';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import RoleUpdatePayload from '../../Domain/Payloads/Role/RoleUpdatePayload';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/roles'
};

const RoleKoaHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();
const controller = new RoleController();

RoleKoaHandler.post('/', AuthorizeKoaMiddleware(Permissions.ROLES_SAVE), async(ctx: DefaultContext) =>
{
    const role: IRoleDomain = await controller.save(ctx.request.body as RoleRepPayload);

    void await responder.send(role, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
});

RoleKoaHandler.get('/', AuthorizeKoaMiddleware(Permissions.ROLES_LIST), async(ctx: DefaultContext) =>
{
    const data: CriteriaPayload = {
        url: ctx.request.url,
        query: ctx.request.query
    };

    const paginator: IPaginator = await controller.list(data);

    await responder.paginate(paginator, ctx, StatusCode.HTTP_OK, new RoleTransformer());
});

RoleKoaHandler.get('/:id', AuthorizeKoaMiddleware(Permissions.ROLES_SHOW), async(ctx: DefaultContext) =>
{
    const role: IRoleDomain = await controller.getOne(ctx.params as IdPayload);

    void await responder.send(role, ctx, StatusCode.HTTP_OK, new RoleTransformer());
});

RoleKoaHandler.put('/:id', AuthorizeKoaMiddleware(Permissions.ROLES_UPDATE), async(ctx: DefaultContext) =>
{
    const data: RoleUpdatePayload = {
        id: ctx.params.id,
        ...ctx.request.body
    };

    const role: IRoleDomain = await controller.update(data);

    void await responder.send(role, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
});

RoleKoaHandler.delete('/:id', AuthorizeKoaMiddleware(Permissions.ROLES_DELETE), async(ctx: DefaultContext) =>
{
    const role: IRoleDomain = await controller.remove(ctx.params as IdPayload);

    void await responder.send(role, ctx, StatusCode.HTTP_CREATED, new RoleTransformer());
});

export default RoleKoaHandler;
