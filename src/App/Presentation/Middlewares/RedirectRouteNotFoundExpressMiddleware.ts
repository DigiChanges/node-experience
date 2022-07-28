import ExpressResponder from '../Shared/Http/ExpressResponder';
import { StatusCode } from '@digichanges/shared-experience';
import RouteNotFoundHttpException from '../Exceptions/RouteNotFoundHttpException';

const RedirectRouteNotFoundExpressMiddleware = (req: any, res: any) =>
{
    const responder = new ExpressResponder();

    responder.error(new RouteNotFoundHttpException(), req, res, StatusCode.HTTP_NOT_FOUND, null);
};

export default RedirectRouteNotFoundExpressMiddleware;
