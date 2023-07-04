import Koa from 'koa';
import container from '../../../register';
import { createRequestContext } from '../../../Shared/Utils/RequestContext';

type KoaCtx = Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>;
type KoaNext = Koa.Next;

const ContainerKoaMiddleware = async(ctx: KoaCtx, next: KoaNext) =>
{
    ctx.container = container.createChildContainer();
    createRequestContext(ctx.container);

    await next();
};

export default ContainerKoaMiddleware;
