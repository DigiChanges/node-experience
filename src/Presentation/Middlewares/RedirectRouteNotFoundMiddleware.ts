import StatusCode from "../Shared/StatusCode";
import Responder from "../Shared/Responder";
import FormatError from "../Shared/FormatError";

const RedirectRouteNotFoundMiddleware = (req: any, res: any, next: any) =>
{
    const responder = new Responder();
    const formatError = new FormatError();

    responder.error(formatError.getFormat("Route Not Found", StatusCode.HTTP_NOT_FOUND, null), res, StatusCode.HTTP_NOT_FOUND);
};

export default RedirectRouteNotFoundMiddleware;
