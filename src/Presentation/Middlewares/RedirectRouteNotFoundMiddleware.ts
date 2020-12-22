import StatusCode from "../Shared/StatusCode";
import Responder from "../Shared/Responder";
import FormatError from "../Shared/FormatError";
import ErrorHttpException from "../../Application/Shared/ErrorHttpException";

const RedirectRouteNotFoundMiddleware = (req: any, res: any, next: any) =>
{
    const responder = new Responder();
    const formatError = new FormatError();

    responder.error(formatError.getFormat(new ErrorHttpException(StatusCode.HTTP_NOT_FOUND, "Route Not Found", [])), req, res, StatusCode.HTTP_NOT_FOUND);
};

export default RedirectRouteNotFoundMiddleware;
