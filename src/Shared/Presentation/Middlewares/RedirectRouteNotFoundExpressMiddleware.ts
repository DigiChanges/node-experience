import ExpressResponder from '../../Application/Http/ExpressResponder';
import RouteNotFoundHttpException from '../Exceptions/RouteNotFoundHttpException';
import StatusCode from '../../Application/StatusCode';

const RedirectRouteNotFoundExpressMiddleware = (req: any, res: any) =>
{
    const responder = new ExpressResponder();

    responder.error(new RouteNotFoundHttpException(), req, res, StatusCode.HTTP_NOT_FOUND);
};

export default RedirectRouteNotFoundExpressMiddleware;
