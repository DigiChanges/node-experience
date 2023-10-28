import Koa from 'koa';
import Router from 'koa-router';
import KoaResponder from '../Utils/KoaResponder';
import { StatusCode } from '@digichanges/shared-experience';

const routerOpts: Router.IRouterOptions = {
    prefix: '/'
};

const IndexKoaRouter: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();

IndexKoaRouter.get('/', async(ctx: Koa.ParameterizedContext) =>
{
    void await responder.send('Welcome to Node Experience', ctx, StatusCode.HTTP_OK);
});

export default IndexKoaRouter;
