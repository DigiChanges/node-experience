import Koa from 'koa';
import Router from 'koa-router';
import StatusCode from '../../Shared/Application/StatusCode';
import KoaResponder from '../Application/Http/KoaResponder';

const routerOpts: Router.IRouterOptions = {
    prefix: '/test'
};

const WhiteListKoaHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();

WhiteListKoaHandler.get('/countries', async(ctx: Koa.ParameterizedContext & any) =>
{
    void await responder.send({ message: 'hello world' }, ctx, StatusCode.HTTP_OK);
});

WhiteListKoaHandler.get('/all/:id', async(ctx: Koa.ParameterizedContext & any) =>
{
    void await responder.send({ message: 'hello world' }, ctx, StatusCode.HTTP_OK);
});

WhiteListKoaHandler.post('/all/hello/world', async(ctx: Koa.ParameterizedContext & any) =>
{
    void await responder.send({ message: 'hello world' }, ctx, StatusCode.HTTP_OK);
});

WhiteListKoaHandler.put('/all/numeric/123', async(ctx: Koa.ParameterizedContext & any) =>
{
    void await responder.send({ message: 'hello world' }, ctx, StatusCode.HTTP_OK);
});

WhiteListKoaHandler.delete('/all/:id/delete', async(ctx: Koa.ParameterizedContext & any) =>
{
    void await responder.send({ message: 'hello world' }, ctx, StatusCode.HTTP_OK);
});

WhiteListKoaHandler.get('/countries/:id', async(ctx: Koa.ParameterizedContext & any) =>
{
    void await responder.send({ message: 'hello world' }, ctx, StatusCode.HTTP_OK);
});

WhiteListKoaHandler.get('/countries/:id/states', async(ctx: Koa.ParameterizedContext & any) =>
{
    void await responder.send({ message: 'hello world' }, ctx, StatusCode.HTTP_OK);
});

WhiteListKoaHandler.get('/countries/:id/states/:stateId/cities', async(ctx: Koa.ParameterizedContext & any) =>
{
    void await responder.send({ message: 'hello world' }, ctx, StatusCode.HTTP_OK);
});

WhiteListKoaHandler.get('/cities/:id/countries/:stateId/states', async(ctx: Koa.ParameterizedContext & any) =>
{
    void await responder.send({ message: 'hello world' }, ctx, StatusCode.HTTP_OK);
});

WhiteListKoaHandler.get('/:id/hello/all', async(ctx: Koa.ParameterizedContext & any) =>
{
    void await responder.send({ message: 'hello world' }, ctx, StatusCode.HTTP_OK);
});

export default WhiteListKoaHandler;
