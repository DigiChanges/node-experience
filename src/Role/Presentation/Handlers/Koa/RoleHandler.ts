import Koa from 'koa';
import Router from 'koa-router';
import { IPaginator, StatusCode } from '@digichanges/shared-experience';
import Responder from '../../../../App/Presentation/Shared/Koa/Responder';
import IdRequest from '../../../../App/Presentation/Requests/IdRequest';
import RoleRepRequest from '../../Requests/Express/RoleRepRequest';
import IRoleDomain from '../../../InterfaceAdapters/IRoleDomain';
import RoleTransformer from '../../Transformers/RoleTransformer';
import RoleRequestCriteria from '../../Requests/Express/RoleRequestCriteria';
import RoleUpdateRequest from '../../Requests/Express/RoleUpdateRequest';
import RoleController from '../../Controllers/RoleController';


const routerOpts: Router.IRouterOptions = {
    prefix: '/api/roles'
};

const RoleHandler: Router = new Router(routerOpts);
const responder: Responder = new Responder();
const controller = new RoleController();

RoleHandler.post('/', async(ctx) =>
{
    const _request = new RoleRepRequest(ctx.request.body);

    const role: IRoleDomain = await controller.save(_request);

    responder.send(role, ctx, StatusCode.HTTP_CREATED, new RoleTransformer());
});

RoleHandler.get('/', async(ctx: Koa.ParameterizedContext) =>
{
    const _request = new RoleRequestCriteria(ctx.request.query, ctx.request.url);

    const paginator: IPaginator = await controller.list(_request);

    await responder.paginate(paginator, ctx, StatusCode.HTTP_OK, new RoleTransformer());
});

RoleHandler.get('/:id', async(ctx: Koa.ParameterizedContext) =>
{
    const _request = new IdRequest(ctx.params.id);

    const role: IRoleDomain = await controller.getOne(_request);

    responder.send(role, ctx, StatusCode.HTTP_OK, new RoleTransformer());
});

RoleHandler.put('/:id', async(ctx: Koa.ParameterizedContext) =>
{
    const _request = new RoleUpdateRequest(ctx.request.body, ctx.params.id);

    const role: IRoleDomain = await controller.update(_request);

    responder.send(role, ctx, StatusCode.HTTP_CREATED, new RoleTransformer());
});

RoleHandler.delete('/:id', async(ctx: Koa.ParameterizedContext) =>
{
    const _request = new IdRequest(ctx.params.id);

    const role: IRoleDomain = await controller.remove(_request);

    responder.send(role, ctx, StatusCode.HTTP_OK, new RoleTransformer());
});

export default RoleHandler;
