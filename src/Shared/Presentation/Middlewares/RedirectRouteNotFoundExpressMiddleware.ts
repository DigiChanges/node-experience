import ExpressResponder from '../../Application/Http/ExpressResponder';
import RouteNotFoundHttpException from '../Exceptions/RouteNotFoundHttpException';
import MainConfig from '../../../Config/MainConfig';

const config = MainConfig.getInstance().getConfig().statusCode;

const RedirectRouteNotFoundExpressMiddleware = (req: any, res: any) =>
{
    const responder = new ExpressResponder();

    responder.error(new RouteNotFoundHttpException(), req, res, config['HTTP_NOT_FOUND']);
};

export default RedirectRouteNotFoundExpressMiddleware;
