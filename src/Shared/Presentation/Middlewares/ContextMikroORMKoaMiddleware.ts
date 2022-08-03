import { ParameterizedContext, Next } from 'koa';
import { RequestContext } from '@mikro-orm/core';
import { orm } from '../../Infrastructure/Database/CreateMikroORMConnection';

const ContextMikroORMKoaMiddleware = async(ctx: ParameterizedContext, next: Next) => RequestContext.createAsync(orm.em, next);

export default ContextMikroORMKoaMiddleware;
