import Koa from 'koa';
import Router from 'koa-router';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import MainConfig, { IHttpStatusCode } from '../../../Config/MainConfig';
import CategoryController from '../Controllers/CategoryController';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/category'
};

const CategoryKoaHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();
const controller = new CategoryController();
const config: Record<string, IHttpStatusCode> = MainConfig.getInstance().getConfig().statusCode;

CategoryKoaHandler.get('/', async(ctx: Koa.ParameterizedContext & any): Promise<void> =>
{
    void await responder.send('Welcome to category', ctx, config['HTTP_OK']);
});

CategoryKoaHandler.put('/', async(ctx: Koa.ParameterizedContext & any): Promise<void> =>
{
    void await responder.send('Welcome to Put', ctx, config['HTTP_OK']);
});

CategoryKoaHandler.post('/', async(ctx: Koa.ParameterizedContext & any): Promise<void> =>
{
    const { body } = ctx.request;
    const category = await controller.save(body);
    void await responder.send('Category created', category, config['HTTP_OK']);
});

export default CategoryKoaHandler;
