import { RequestContext } from '@mikro-orm/core';
import { orm } from '../../Infrastructure/Database/CreateMikroORMConnection';

const ContextMikroORMExpressMiddleware = async(req: any, res: any, next: any) => RequestContext.createAsync(orm.em, next);

export default ContextMikroORMExpressMiddleware;
