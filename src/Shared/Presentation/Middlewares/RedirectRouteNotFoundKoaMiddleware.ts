import KoaResponder from '../../Application/Http/KoaResponder';
import RouteNotFoundHttpException from '../Exceptions/RouteNotFoundHttpException';
import StatusCode from '../../Application/StatusCode';

const RedirectRouteNotFoundKoaMiddleware = (ctx: any) =>
{
    const responder = new KoaResponder();

    responder.error(new RouteNotFoundHttpException(), ctx, StatusCode.HTTP_NOT_FOUND, null);
};

export default RedirectRouteNotFoundKoaMiddleware;
