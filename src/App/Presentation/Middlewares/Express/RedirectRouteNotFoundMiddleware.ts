import Responder from '../../Shared/Express/Responder';
import FormatError from '../../Shared/FormatError';
import { StatusCode } from '@digichanges/shared-experience';
import RouteNotFoundHttpException from '../../Exceptions/RouteNotFoundHttpException';

const RedirectRouteNotFoundMiddleware = (req: any, res: any) =>
{
    const responder = new Responder();
    const formatError = new FormatError();

    responder.error(formatError.getFormat(new RouteNotFoundHttpException()), req, res, StatusCode.HTTP_NOT_FOUND, null);
};

export default RedirectRouteNotFoundMiddleware;
