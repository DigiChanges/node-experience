import { url } from 'envalid';
import { Query } from 'mongoose';
import Koa from 'koa';
import Router from 'koa-router';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import MainConfig, { IHttpStatusCode } from '../../../Config/MainConfig';
import ProductController from '../Controllers/ProductController';
import IProductDomain from '../../Domain/Entities/IProductDomain';
import CriteriaPayload from '../../../Shared/Presentation/Validations/CriteriaPayload';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

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

    await responder.send(data, ctx, config['HTTP_OK']);
});

ProductKoaHandler.post('/', async(ctx: Koa.ParameterizedContext & any): Promise<void> =>
{
    const { body } = ctx.request;
    await controller.save(body);
    void await responder.send('Product created', ctx, config['HTTP_CREATED']);
});

export default ProductKoaHandler;