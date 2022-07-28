import Koa from 'koa';
import Router from 'koa-router';
import KoaResponder from '../Shared/Http/KoaResponder';
import { StatusCode } from '@digichanges/shared-experience';

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
