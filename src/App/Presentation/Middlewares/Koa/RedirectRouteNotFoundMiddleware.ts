import Responder from '../../Shared/Koa/Responder';
import FormatError from '../../Shared/FormatError';
import { StatusCode } from '@digichanges/shared-experience';
import RouteNotFoundHttpException from '../../Exceptions/RouteNotFoundHttpException';

const RedirectRouteNotFoundMiddleware = (ctx: any) =>
{
    const responder = new Responder();
    const formatError = new FormatError();

    responder.error(formatError.getFormat(new RouteNotFoundHttpException()), ctx, StatusCode.HTTP_NOT_FOUND);
};

export default RedirectRouteNotFoundMiddleware;
