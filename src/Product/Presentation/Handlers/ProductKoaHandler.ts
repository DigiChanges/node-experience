import Koa from 'koa';
import Router from 'koa-router';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import MainConfig, { IHttpStatusCode } from '../../../Config/MainConfig';
import ProductController from '../Controllers/ProductController';
import IProductDomain from '../../Domain/Entities/IProductDomain';
import DefaultMessageTransformer from '../../../Shared/Presentation/Transformers/DefaultMessageTransformer';
import ResponseMessageEnum from '../../../Shared/Domain/Enum/ResponseMessageEnum';
import ProductTransformer from '../Transformers/ProductTransformer';
import ProductUpdatePayload from '../../Domain/Payloads/ProductUpdatePayload';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/product'
};

const ProductKoaHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();
const controller = new ProductController();
const config: Record<string, IHttpStatusCode> = MainConfig.getInstance().getConfig().statusCode;


ProductKoaHandler.get('/', async(ctx: Koa.ParameterizedContext & any) =>
{
    const data: IProductDomain[] = await controller.list();

    await responder.send(data, ctx, config['HTTP_OK'], new ProductTransformer());
});

ProductKoaHandler.get('/:id', async(ctx: Koa.ParameterizedContext & any) =>
{
    const data = {
        id: ctx.params.id
    };

    const product: IProductDomain = await controller.getOne(data);

    await responder.send(product, ctx, config['HTTP_OK'], new ProductTransformer());
});

ProductKoaHandler.post('/', async(ctx: Koa.ParameterizedContext & any): Promise<void> =>
{
    const { body } = ctx.request;
    const product = await controller.save(body);
    void await responder.send(product, ctx, config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
});

ProductKoaHandler.delete('/:id', async(ctx: Koa.ParameterizedContext & any): Promise<void> =>
{
    const { params } = ctx.request;
    const product = await controller.remove(params);
    void await responder.send(product, ctx, config['HTTP_OK'], new ProductTransformer());
});

ProductKoaHandler.put('/:id', async(ctx: Koa.ParameterizedContext & any): Promise<void> =>
{
    const data = {
        ...ctx.request.body,
        id: ctx.params.id
    };
    const product: IProductDomain = await controller.update(data as ProductUpdatePayload);
    void await responder.send(product, ctx, config['HTTP_OK'], new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
});

export default ProductKoaHandler;
