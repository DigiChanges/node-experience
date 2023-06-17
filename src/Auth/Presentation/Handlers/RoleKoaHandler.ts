import { DefaultContext } from 'koa';
import Router from 'koa-router';
import MainConfig from '../../../Config/MainConfig';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import IRoleDomain from '../../Domain/Entities/IRoleDomain';
import RoleTransformer from '../Transformers/RoleTransformer';
import AuthorizeKoaMiddleware from '../Middlewares/AuthorizeKoaMiddleware';
import Permissions from '../../../Config/Permissions';
import ResponseMessageEnum from '../../../Shared/Domain/Enum/ResponseMessageEnum';
import DefaultMessageTransformer from '../../../Shared/Presentation/Transformers/DefaultMessageTransformer';
import RoleRepPayload from '../../Domain/Payloads/Role/RoleRepPayload';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import RoleUpdatePayload from '../../Domain/Payloads/Role/RoleUpdatePayload';
import SaveRoleUseCase from '../../Domain/UseCases/Role/SaveRoleUseCase';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import RequestCriteria from '../../../Shared/Presentation/Requests/RequestCriteria';
import RoleFilter from '../Criterias/RoleFilter';
import RoleSort from '../Criterias/RoleSort';
import Pagination from '../../../Shared/Presentation/Shared/Pagination';
import ListRolesUseCase from '../../Domain/UseCases/Role/ListRolesUseCase';
import GetRoleUseCase from '../../Domain/UseCases/Role/GetRoleUseCase';
import UpdateRoleUseCase from '../../Domain/UseCases/Role/UpdateRoleUseCase';
import RemoveRoleUseCase from '../../Domain/UseCases/Role/RemoveRoleUseCase';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/roles'
};

const RoleKoaHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();
const config = MainConfig.getInstance().getConfig().statusCode;

RoleKoaHandler.post('/', AuthorizeKoaMiddleware(Permissions.ROLES_SAVE), async(ctx: DefaultContext) =>
{
    const useCase = new SaveRoleUseCase();
    const role: IRoleDomain = await useCase.handle(ctx.request.body as RoleRepPayload);

    void await responder.send(role, ctx, config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
});

RoleKoaHandler.get('/', AuthorizeKoaMiddleware(Permissions.ROLES_LIST), async(ctx: DefaultContext) =>
{
    const { url, query } = ctx.request;

    const requestCriteria: ICriteria = new RequestCriteria(
        {
            filter: new RoleFilter(query),
            sort: new RoleSort(query),
            pagination: new Pagination(query, url)
        });

    const useCase = new ListRolesUseCase();
    const paginator: IPaginator = await useCase.handle(requestCriteria);

    await responder.send(paginator, ctx, config['HTTP_OK'], new RoleTransformer());
});

RoleKoaHandler.get('/:id', AuthorizeKoaMiddleware(Permissions.ROLES_SHOW), async(ctx: DefaultContext) =>
{
    const useCase = new GetRoleUseCase();
    const role: IRoleDomain = await useCase.handle(ctx.params as IdPayload);

    void await responder.send(role, ctx, config['HTTP_OK'], new RoleTransformer());
});

RoleKoaHandler.put('/:id', AuthorizeKoaMiddleware(Permissions.ROLES_UPDATE), async(ctx: DefaultContext) =>
{
    const data: RoleUpdatePayload = {
        id: ctx.params.id,
        ...ctx.request.body
    };

    const useCase = new UpdateRoleUseCase();
    const role: IRoleDomain = await useCase.handle(data);

    void await responder.send(role, ctx, config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
});

RoleKoaHandler.delete('/:id', AuthorizeKoaMiddleware(Permissions.ROLES_DELETE), async(ctx: DefaultContext) =>
{
    const { id: name } = ctx.params;

    const useCase = new RemoveRoleUseCase();
    await useCase.handle(name);

    void await responder.send(ctx.params, ctx, config['HTTP_OK'], new DefaultMessageTransformer(ResponseMessageEnum.DELETED));
});

export default RoleKoaHandler;
