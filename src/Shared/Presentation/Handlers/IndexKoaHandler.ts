import Koa from 'koa';
import Router from 'koa-router';
import KoaResponder from '../../Application/Http/KoaResponder';
import MainConfig, { IHttpStatusCode } from '../../../Config/MainConfig';

const routerOpts: Router.IRouterOptions = {
    prefix: '/'
};

const IndexKoaHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();
const config: Record<string, IHttpStatusCode> = MainConfig.getInstance().getConfig().statusCode;

IndexKoaHandler.get('/', async(ctx: Koa.ParameterizedContext & any) =>
{
    void await responder.send('Welcome to Node Experience', ctx, config['HTTP_OK']);
});

export default IndexKoaHandler;
