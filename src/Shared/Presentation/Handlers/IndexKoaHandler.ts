import Koa from 'koa';
import Router from 'koa-router';
import KoaResponder from '../../Application/Http/KoaResponder';
import StatusCode from '../../Application/StatusCode';

const routerOpts: Router.IRouterOptions = {
    prefix: '/'
};

const IndexKoaHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();

IndexKoaHandler.get('/', async(ctx: Koa.ParameterizedContext & any) =>
{
    void await responder.send('Welcome to Node Experience', ctx, StatusCode.HTTP_OK);
});

export default IndexKoaHandler;
