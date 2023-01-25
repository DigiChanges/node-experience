import KoaResponder from '../../Application/Http/KoaResponder';
import RouteNotFoundHttpException from '../Exceptions/RouteNotFoundHttpException';
import MainConfig from '../../../Config/MainConfig';

const config = MainConfig.getInstance().getConfig().statusCode;

const RedirectRouteNotFoundKoaMiddleware = (ctx: any) =>
{
    const responder = new KoaResponder();

    responder.error(new RouteNotFoundHttpException(), ctx, config['HTTP_NOT_FOUND'], null);
};

export default RedirectRouteNotFoundKoaMiddleware;
