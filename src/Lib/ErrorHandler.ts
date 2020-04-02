import Responder from "./Responder";
import StatusCode from "./StatusCode";
import FormatError from "./FormatError";

export class ErrorHandler
{
    static handle(err: any, req: any, res: any, next: any)
    {
        const responder = new Responder();
        const formatError = new FormatError();

        let {statusCode, message} = err;

        if (!statusCode) {
            statusCode = StatusCode.HTTP_INTERNAL_SERVER_ERROR;
        }

        responder.error(formatError.getFormat(message, statusCode), res, statusCode);
    }
}