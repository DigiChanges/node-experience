import Koa from 'koa';
import Router from 'koa-router';
import { StatusCode } from '@digichanges/shared-experience';
import Responder from '../../../App/Presentation/Shared/Koa/Responder';

const routerOpts: Router.IRouterOptions = {
    prefix: '/test'
};

const WhiteListHandler: Router = new Router(routerOpts);
const responder: Responder = new Responder();

WhiteListHandler.get('/countries', async(ctx: Koa.ParameterizedContext & any) =>
{
    void await responder.send({ message: 'hello world' }, ctx, StatusCode.HTTP_OK);
});

WhiteListHandler.get('/all/:id', async(ctx: Koa.ParameterizedContext & any) =>
{
    void await responder.send({ message: 'hello world' }, ctx, StatusCode.HTTP_OK);
});

WhiteListHandler.post('/all/hello/world', async(ctx: Koa.ParameterizedContext & any) =>
{
    void await responder.send({ message: 'hello world' }, ctx, StatusCode.HTTP_OK);
});

WhiteListHandler.put('/all/numeric/123', async(ctx: Koa.ParameterizedContext & any) =>
{
    void await responder.send({ message: 'hello world' }, ctx, StatusCode.HTTP_OK);
});

WhiteListHandler.delete('/all/:id/delete', async(ctx: Koa.ParameterizedContext & any) =>
{
    void await responder.send({ message: 'hello world' }, ctx, StatusCode.HTTP_OK);
});

WhiteListHandler.get('/countries/:id', async(ctx: Koa.ParameterizedContext & any) =>
{
    void await responder.send({ message: 'hello world' }, ctx, StatusCode.HTTP_OK);
});

WhiteListHandler.get('/countries/:id/states', async(ctx: Koa.ParameterizedContext & any) =>
{
    void await responder.send({ message: 'hello world' }, ctx, StatusCode.HTTP_OK);
});

WhiteListHandler.get('/countries/:id/states/:stateId/cities', async(ctx: Koa.ParameterizedContext & any) =>
{
    void await responder.send({ message: 'hello world' }, ctx, StatusCode.HTTP_OK);
});

WhiteListHandler.get('/cities/:id/countries/:stateId/states', async(ctx: Koa.ParameterizedContext & any) =>
{
    void await responder.send({ message: 'hello world' }, ctx, StatusCode.HTTP_OK);
});

WhiteListHandler.get('/:id/hello/all', async(ctx: Koa.ParameterizedContext & any) =>
{
    void await responder.send({ message: 'hello world' }, ctx, StatusCode.HTTP_OK);
});

export default WhiteListHandler;
