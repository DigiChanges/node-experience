import Responder from '../../Shared/Http/Koa/Responder';
import { StatusCode } from '@digichanges/shared-experience';
import RouteNotFoundHttpException from '../../Exceptions/RouteNotFoundHttpException';

const RedirectRouteNotFoundMiddleware = (ctx: any) =>
{
    const responder = new Responder();

    responder.error(new RouteNotFoundHttpException(), ctx, StatusCode.HTTP_NOT_FOUND);
};

export default RedirectRouteNotFoundMiddleware;
