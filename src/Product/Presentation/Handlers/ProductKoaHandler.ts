import { DefaultContext } from 'koa';
import Router from 'koa-router';

import MainConfig from '../../../Config/MainConfig';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import ProductController from '../Controllers/ProductController';
import ProductTransformer from '../Transformers/ProductTransformer';
import { AuthUser } from '../../../Auth/Presentation/Helpers/AuthUser';
import AuthorizeKoaMiddleware from '../../../Auth/Presentation/Middlewares/AuthorizeKoaMiddleware';
import Permissions from '../../../Config/Permissions';
import ResponseMessageEnum from '../../../Shared/Domain/Enum/ResponseMessageEnum';
import DefaultMessageTransformer from '../../../Shared/Presentation/Transformers/DefaultMessageTransformer';
import ProductRepPayload from '../../Domain/Payloads/ProductRepPayload';
import CriteriaPayload from '../../../Shared/Presentation/Validations/CriteriaPayload';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import ProductUpdatePayload from '../../Domain/Payloads/ProductUpdatePayload';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/product'
};

const ProductKoaHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();
const controller: ProductController = new ProductController();
const config = MainConfig.getInstance().getConfig().statusCode;

ProductKoaHandler.post('/', AuthorizeKoaMiddleware(Permissions.PRODUCT_SAVE), async(ctx: DefaultContext) =>
{
    const data: ProductRepPayload = {
        authUser: AuthUser(ctx),
        ...ctx.request.body
    };

    const product = await controller.save(data);

    void await responder.send(product, ctx, config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
});

ProductKoaHandler.get('/', AuthorizeKoaMiddleware(Permissions.PRODUCT_LIST), async(ctx: DefaultContext) =>
{
    const data: CriteriaPayload = {
        url: ctx.request.url,
        query: ctx.request.query
    };

    const paginator: IPaginator = await controller.list(data);

    await responder.paginate(paginator, ctx, config['HTTP_OK'], new ProductTransformer());
});

ProductKoaHandler.get('/:id', AuthorizeKoaMiddleware(Permissions.PRODUCT_SHOW), async(ctx: DefaultContext) =>
{
    const product = await controller.getOne(ctx.params as IdPayload);

    void await responder.send(product, ctx, config['HTTP_OK'], new ProductTransformer());
});

ProductKoaHandler.put('/:id', AuthorizeKoaMiddleware(Permissions.PRODUCT_UPDATE), async(ctx: DefaultContext) =>
{
    const data: ProductUpdatePayload = {
        id: ctx.params.id,
        authUser: AuthUser(ctx),
        ...ctx.request.body
    };

    const product = await controller.update(data);

    void await responder.send(product, ctx, config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
});

ProductKoaHandler.delete('/:id', AuthorizeKoaMiddleware(Permissions.PRODUCT_DELETE), async(ctx: DefaultContext) =>
{
    const product = await controller.remove(ctx.params as IdPayload);

    void await responder.send(product, ctx, config['HTTP_CREATED'], new ProductTransformer());
});

export default ProductKoaHandler;
