import Koa from 'koa';
import Router from 'koa-router';
import { IPaginator, StatusCode } from '@digichanges/shared-experience';
import KoaResponder from '../../../App/Presentation/Shared/Http/KoaResponder';
import ItemController from '../Controllers/ItemController';
import ItemTransformer from '../Transformers/ItemTransformer';
import ItemRepRequest from '../Requests/ItemRepRequest';
import { AuthUser } from '../../../Auth/Presentation/Helpers/AuthUser';
import IdRequest from '../../../App/Presentation/Requests/IdRequest';
import ItemRequestCriteria from '../Requests/ItemRequestCriteria';
import ItemUpdateRequest from '../Requests/ItemUpdateRequest';
import AuthorizeKoaMiddleware from '../../../Auth/Presentation/Middlewares/AuthorizeKoaMiddleware';
import Permissions from '../../../Config/Permissions';
import ResponseMessageEnum from '../../../App/Domain/Enum/ResponseMessageEnum';
import DefaultMessageTransformer from '../../../App/Presentation/Transformers/DefaultMessageTransformer';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/items'
};

const ItemKoaHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();
const controller: ItemController = new ItemController();

ItemKoaHandler.post('/', AuthorizeKoaMiddleware(Permissions.ITEMS_SAVE), async(ctx: Koa.ParameterizedContext & any) =>
{
    const request = new ItemRepRequest(ctx.request.body);

    const item = await controller.save(request, AuthUser(ctx));

    void await responder.send(item, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
});

ItemKoaHandler.get('/', AuthorizeKoaMiddleware(Permissions.ITEMS_LIST), async(ctx: Koa.ParameterizedContext & any) =>
{
    const data = {
        url: ctx.request.url,
        query: ctx.request.query
    };

    const _request = new ItemRequestCriteria(data);

    const paginator: IPaginator = await controller.list(_request);

    await responder.paginate(paginator, ctx, StatusCode.HTTP_OK, new ItemTransformer());
});

ItemKoaHandler.get('/:id', AuthorizeKoaMiddleware(Permissions.ITEMS_SHOW), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new IdRequest(ctx.params);

    const item = await controller.getOne(_request);

    void await responder.send(item, ctx, StatusCode.HTTP_OK, new ItemTransformer());
});

ItemKoaHandler.put('/:id', AuthorizeKoaMiddleware(Permissions.ITEMS_UPDATE), async(ctx: Koa.ParameterizedContext & any) =>
{
    const data = {
        id: ctx.params.id,
        authUser: AuthUser(ctx),
        ...ctx.request.body
    };

    const _request = new ItemUpdateRequest(data);

    const item = await controller.update(_request);

    void await responder.send(item, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
});

ItemKoaHandler.delete('/:id', AuthorizeKoaMiddleware(Permissions.ITEMS_DELETE), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new IdRequest(ctx.params);

    const item = await controller.remove(_request);

    void await responder.send(item, ctx, StatusCode.HTTP_OK, new ItemTransformer());
});

export default ItemKoaHandler;
