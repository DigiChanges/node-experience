import Responder from "../Shared/Responder";
import FormatError from "../Shared/FormatError";
import {StatusCode} from "@digichanges/shared-experience";
import RouteNotFoundHttpException from "../Exceptions/RouteNotFoundHttpException";

const RedirectRouteNotFoundMiddleware = (req: any, res: any, next: any) =>
{
    const responder = new Responder();
    const formatError = new FormatError();

    responder.error(formatError.getFormat(new RouteNotFoundHttpException()), req, res, StatusCode.HTTP_NOT_FOUND);
};

export default RedirectRouteNotFoundMiddleware;
