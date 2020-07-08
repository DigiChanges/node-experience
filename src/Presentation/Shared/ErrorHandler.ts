import moment from "moment";
import Responder from "./Responder";
import StatusCode from "./StatusCode";
import FormatError from "./FormatError";
import {loggerCli, loggerFile} from '../../Infrastructure/Shared/Logger';

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

        if (statusCode === StatusCode.HTTP_INTERNAL_SERVER_ERROR) {
            const meta = {
                code: StatusCode.HTTP_INTERNAL_SERVER_ERROR,
                method: req.method,
                path: req.path,
                date: moment().toISOString()
            };

            loggerFile.error(err.stack, meta);
        }

        loggerCli.debug(err.stack);

        responder.error(formatError.getFormat(message, statusCode), res, statusCode);
    }
}