import moment from "moment";
import Responder from "./Responder";
import StatusCode from "./StatusCode";
import FormatError from "./FormatError";
import {loggerCli, loggerFile} from '../../Infrastructure/Shared/Logger';
import {ErrorExceptionMapper} from './ErrorExceptionMapper';

export class ErrorHandler
{
    static handle(err: any, req: any, res: any, next: any)
    {
        const responder = new Responder();
        const formatError = new FormatError();

        let {statusCode, message, errors} = ErrorExceptionMapper.handle(err);

        if (!statusCode)
        {
            statusCode = StatusCode.HTTP_INTERNAL_SERVER_ERROR;
        }

        if (statusCode.code === StatusCode.HTTP_INTERNAL_SERVER_ERROR.code)
        {
            const meta = {
                code: StatusCode.HTTP_INTERNAL_SERVER_ERROR.code,
                method: req.method,
                path: req.path,
                date: moment().toISOString()
            };

            loggerFile.error(err.stack, meta);
        }

        loggerCli.debug(err.stack);

        responder.error(formatError.getFormat(message, statusCode, errors), res, statusCode);
    }
}