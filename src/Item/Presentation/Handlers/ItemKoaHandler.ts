import { DefaultContext } from 'koa';
import Router from 'koa-router';

import MainConfig from '../../../Config/MainConfig';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import ItemTransformer from '../Transformers/ItemTransformer';
import AuthorizeKoaMiddleware from '../../../Auth/Presentation/Middlewares/AuthorizeKoaMiddleware';
import Permissions from '../../../Config/Permissions';
import ResponseMessageEnum from '../../../Shared/Domain/Enum/ResponseMessageEnum';
import DefaultMessageTransformer from '../../../Shared/Presentation/Transformers/DefaultMessageTransformer';
import ItemRepPayload from '../../Domain/Payloads/ItemRepPayload';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import ItemUpdatePayload from '../../Domain/Payloads/ItemUpdatePayload';
import SaveItemUseCase from '../../Domain/UseCases/SaveItemUseCase';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import RequestCriteria from '../../../Shared/Presentation/Requests/RequestCriteria';
import ItemFilter from '../Criterias/ItemFilter';
import ItemSort from '../Criterias/ItemSort';
import Pagination from '../../../Shared/Presentation/Shared/Pagination';
import ListItemsUseCase from '../../Domain/UseCases/ListItemsUseCase';
import GetItemUseCase from '../../Domain/UseCases/GetItemUseCase';
import UpdateItemUseCase from '../../Domain/UseCases/UpdateItemUseCase';
import RemoveItemUseCase from '../../Domain/UseCases/RemoveItemUseCase';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/items'
};

const ItemKoaHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();
const config = MainConfig.getInstance().getConfig().statusCode;

ItemKoaHandler.post('/', AuthorizeKoaMiddleware(Permissions.ITEMS_SAVE), async(ctx: DefaultContext) =>
{
    const payload: ItemRepPayload = {
        ...ctx.request.body
    };

    const useCase = new SaveItemUseCase();
    const item = await useCase.handle(payload);

    void await responder.send(item, ctx, config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
});

ItemKoaHandler.get('/', AuthorizeKoaMiddleware(Permissions.ITEMS_LIST), async(ctx: DefaultContext) =>
{
    const { url, query } = ctx.request.url;

    const requestCriteria: ICriteria = new RequestCriteria(
        {
            filter: new ItemFilter(query),
            sort: new ItemSort(query),
            pagination: new Pagination(query, url)
        });

    const useCase = new ListItemsUseCase();
    const paginator: IPaginator = await useCase.handle(requestCriteria);

    await responder.paginate(paginator, ctx, config['HTTP_OK'], new ItemTransformer());
});

ItemKoaHandler.get('/:id', AuthorizeKoaMiddleware(Permissions.ITEMS_SHOW), async(ctx: DefaultContext) =>
{
    const useCase = new GetItemUseCase();
    const item = await useCase.handle(ctx.params as IdPayload);

    void await responder.send(item, ctx, config['HTTP_OK'], new ItemTransformer());
});

ItemKoaHandler.put('/:id', AuthorizeKoaMiddleware(Permissions.ITEMS_UPDATE), async(ctx: DefaultContext) =>
{
    const payload: ItemUpdatePayload = {
        id: ctx.params.id,
        ...ctx.request.body
    };

    const useCase = new UpdateItemUseCase();
    const item =  await useCase.handle(payload);

    void await responder.send(item, ctx, config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
});

ItemKoaHandler.delete('/:id', AuthorizeKoaMiddleware(Permissions.ITEMS_DELETE), async(ctx: DefaultContext) =>
{
    const useCase = new RemoveItemUseCase();
    const item =  await useCase.handle(ctx.params as IdPayload);

    void await responder.send(item, ctx, config['HTTP_CREATED'], new ItemTransformer());
});

export default ItemKoaHandler;
