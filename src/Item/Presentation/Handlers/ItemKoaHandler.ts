import { DefaultContext } from 'koa';
import Router from 'koa-router';

import StatusCode from '../../../Shared/Application/StatusCode';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import ItemController from '../Controllers/ItemController';
import ItemTransformer from '../Transformers/ItemTransformer';
import { AuthUser } from '../../../Auth/Presentation/Helpers/AuthUser';
import AuthorizeKoaMiddleware from '../../../Auth/Presentation/Middlewares/AuthorizeKoaMiddleware';
import Permissions from '../../../Config/Permissions';
import ResponseMessageEnum from '../../../Shared/Domain/Enum/ResponseMessageEnum';
import DefaultMessageTransformer from '../../../Shared/Presentation/Transformers/DefaultMessageTransformer';
import ItemRepPayload from '../../Domain/Payloads/ItemRepPayload';
import CriteriaPayload from '../../../Shared/Presentation/Validations/CriteriaPayload';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import ItemUpdatePayload from '../../Domain/Payloads/ItemUpdatePayload';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/items'
};

const ItemKoaHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();
const controller: ItemController = new ItemController();

ItemKoaHandler.post('/', AuthorizeKoaMiddleware(Permissions.ITEMS_SAVE), async(ctx: DefaultContext) =>
{
    const data: ItemRepPayload = {
        authUser: AuthUser(ctx),
        ...ctx.request.body
    };

    const item = await controller.save(data);

    void await responder.send(item, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
});

ItemKoaHandler.get('/', AuthorizeKoaMiddleware(Permissions.ITEMS_LIST), async(ctx: DefaultContext) =>
{
    const data: CriteriaPayload = {
        url: ctx.request.url,
        query: ctx.request.query
    };

    const paginator: IPaginator = await controller.list(data);

    await responder.paginate(paginator, ctx, StatusCode.HTTP_OK, new ItemTransformer());
});

ItemKoaHandler.get('/:id', AuthorizeKoaMiddleware(Permissions.ITEMS_SHOW), async(ctx: DefaultContext) =>
{
    const item = await controller.getOne(ctx.params as IdPayload);

    void await responder.send(item, ctx, StatusCode.HTTP_OK, new ItemTransformer());
});

ItemKoaHandler.put('/:id', AuthorizeKoaMiddleware(Permissions.ITEMS_UPDATE), async(ctx: DefaultContext) =>
{
    const data: ItemUpdatePayload = {
        id: ctx.params.id,
        authUser: AuthUser(ctx),
        ...ctx.request.body
    };

    const item = await controller.update(data);

    void await responder.send(item, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
});

ItemKoaHandler.delete('/:id', AuthorizeKoaMiddleware(Permissions.ITEMS_DELETE), async(ctx: DefaultContext) =>
{
    const item = await controller.remove(ctx.params as IdPayload);

    void await responder.send(item, ctx, StatusCode.HTTP_CREATED, new ItemTransformer());
});

export default ItemKoaHandler;
