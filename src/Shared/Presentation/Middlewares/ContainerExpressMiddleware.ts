import container from '../../../register';
import { createRequestContext } from '../Shared/RequestContext';

const ContainerExpressMiddleware = async(req: any, res: any, next: any) =>
{
    req.container = container.createChildContainer();
    createRequestContext(req.container);

    next();
};

export default ContainerExpressMiddleware;
