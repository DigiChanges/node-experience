import Koa from 'koa';
import Router from 'koa-router';
import { IPaginator, StatusCode } from '@digichanges/shared-experience';
import Responder from '../../../../App/Presentation/Shared/Koa/Responder';
import ItemController from '../../Controllers/ItemController';
import ItemTransformer from '../../Transformers/ItemTransformer';
import ItemRepRequest from '../../Requests/ItemRepRequest';
import { AuthUser } from '../../../../Auth/Presentation/Helpers/AuthUser';
import IdRequest from '../../../../App/Presentation/Requests/IdRequest';
import ItemRequestCriteria from '../../Requests/ItemRequestCriteria';
import ItemUpdateRequest from '../../Requests/ItemUpdateRequest';
import AuthorizeMiddleware from '../../../../Auth/Presentation/Middlewares/Koa/AuthorizeMiddleware';
import Permissions from '../../../../Config/Permissions';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/items'
};

const ItemHandler: Router = new Router(routerOpts);
const responder: Responder = new Responder();
const controller: ItemController = new ItemController();

ItemHandler.post('/', AuthorizeMiddleware(Permissions.ITEMS_SAVE), async(ctx: Koa.ParameterizedContext & any) =>
{
    const request = new ItemRepRequest(ctx.request.body);

    const item = await controller.save(request, AuthUser(ctx));

    void await responder.send(null, ctx, StatusCode.HTTP_CREATED);
});

ItemHandler.get('/', AuthorizeMiddleware(Permissions.ITEMS_LIST), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new ItemRequestCriteria(ctx.request.query, ctx.request.url);

    const paginator: IPaginator = await controller.list(_request);

    await responder.paginate(paginator, ctx, StatusCode.HTTP_OK, new ItemTransformer());
});

ItemHandler.get('/:id', AuthorizeMiddleware(Permissions.ITEMS_SHOW), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new IdRequest({ id: ctx.params.id });

    const item = await controller.getOne(_request);

    void await responder.send(item, ctx, StatusCode.HTTP_OK, new ItemTransformer());
});

ItemHandler.put('/:id', AuthorizeMiddleware(Permissions.ITEMS_UPDATE), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new ItemUpdateRequest(ctx.request.body, ctx.params.id);

    const item = await controller.update(_request, AuthUser(ctx));

    void await responder.send(null, ctx, StatusCode.HTTP_CREATED);
});

ItemHandler.delete('/:id', AuthorizeMiddleware(Permissions.ITEMS_DELETE), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new IdRequest({ id: ctx.params.id });

    const item = await controller.remove(_request);

    void await responder.send(item, ctx, StatusCode.HTTP_OK, new ItemTransformer());
});

export default ItemHandler;
