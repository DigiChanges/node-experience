import Koa from 'koa';
import Router from 'koa-router';
import StatusCode from '../../../Shared/Application/StatusCode';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import IdRequest from '../../../Shared/Presentation/Requests/IdRequest';
import ProductRepRequest from '../Requests/Product/ProductRepRequest';
import IProductDomain from '../../Domain/Entities/IProductDomain';
import ProductTransformer from '../Transformers/ProductTransformer';
import ProductRequestCriteria from '../Requests/Product/ProductRequestCriteria';
import ProductUpdateRequest from '../Requests/Product/ProductUpdateRequest';
import ProductController from '../Controllers/ProductController';
import AuthorizeKoaMiddleware from '../../../Auth/Presentation/Middlewares/AuthorizeKoaMiddleware';
import Permissions from '../../../Config/Permissions';
import ResponseMessageEnum from '../../../Shared/Domain/Enum/ResponseMessageEnum';
import DefaultMessageTransformer from '../../../Shared/Presentation/Transformers/DefaultMessageTransformer';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/products'
};

const ProductKoaHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();
const controller = new ProductController();

ProductKoaHandler.post('/', AuthorizeKoaMiddleware(Permissions.ROLES_SAVE), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new ProductRepRequest(ctx.request.body);

    const product: IProductDomain = await controller.save(_request);

    void await responder.send(product, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
});

ProductKoaHandler.get('/', AuthorizeKoaMiddleware(Permissions.ROLES_LIST), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new ProductRequestCriteria(ctx.request.query, ctx.request.url);

    const paginator: IPaginator = await controller.list(_request);

    await responder.paginate(paginator, ctx, StatusCode.HTTP_OK, new ProductTransformer());
});

ProductKoaHandler.get('/:id', AuthorizeKoaMiddleware(Permissions.ROLES_SHOW), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new IdRequest({ id: ctx.params.id });

    const product: IProductDomain = await controller.getOne(_request);

    void await responder.send(product, ctx, StatusCode.HTTP_OK, new ProductTransformer());
});

ProductKoaHandler.put('/:id', AuthorizeKoaMiddleware(Permissions.ROLES_UPDATE), async(ctx: Koa.ParameterizedContext & any) =>
{
    const data = {
        id: ctx.params.id,
        ...ctx.request.body
    };

    const _request = new ProductUpdateRequest(data);

    const product: IProductDomain = await controller.update(_request);

    void await responder.send(product, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
});

ProductKoaHandler.delete('/:id', AuthorizeKoaMiddleware(Permissions.ROLES_DELETE), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new IdRequest({ id: ctx.params.id });

    const product: IProductDomain = await controller.remove(_request);

    void await responder.send(product, ctx, StatusCode.HTTP_CREATED, new ProductTransformer());
});

export default ProductKoaHandler;
