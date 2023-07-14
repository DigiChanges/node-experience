import KoaResponder from '../Utils/KoaResponder';
import RouteNotFoundHttpException from '../Exceptions/RouteNotFoundHttpException';
import { StatusCode } from '@digichanges/shared-experience';

const RedirectRouteNotFoundKoaMiddleware = (ctx: any) =>
{
    const responder = new KoaResponder();

    responder.error(new RouteNotFoundHttpException(), ctx, StatusCode.HTTP_NOT_FOUND, null);
};

export default RedirectRouteNotFoundKoaMiddleware;
