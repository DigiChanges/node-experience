import Koa from 'koa';
import Router from 'koa-router';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import MainConfig, { IHttpStatusCode } from '../../../Config/MainConfig';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/category'
};

const CategoryKoaHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();
const config: Record<string, IHttpStatusCode> = MainConfig.getInstance().getConfig().statusCode;

CategoryKoaHandler.get('/', async(ctx: Koa.ParameterizedContext & any) =>
{
    void await responder.send('Welcome to category', ctx, config['HTTP_OK']);
});

export default CategoryKoaHandler;
