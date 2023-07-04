import { getRequestContext } from '../../../Shared/Utils/RequestContext';

const GetRequestContextKoaMiddleware = async(ctx, next) =>
{
    const data = getRequestContext();
    await data.container?.dispose();
    delete data.container;

    await next();
};

export default GetRequestContextKoaMiddleware;
