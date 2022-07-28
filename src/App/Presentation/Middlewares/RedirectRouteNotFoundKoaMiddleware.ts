import KoaResponder from '../Shared/Http/KoaResponder';
import { StatusCode } from '@digichanges/shared-experience';
import RouteNotFoundHttpException from '../Exceptions/RouteNotFoundHttpException';

const RedirectRouteNotFoundKoaMiddleware = (ctx: any) =>
{
    const responder = new KoaResponder();

    responder.error(new RouteNotFoundHttpException(), ctx, StatusCode.HTTP_NOT_FOUND, null);
};

export default RedirectRouteNotFoundKoaMiddleware;
