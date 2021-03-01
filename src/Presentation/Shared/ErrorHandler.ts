import moment from "moment";
import {StatusCode} from "@digichanges/shared-experience";

import Responder from "./Responder";
import FormatError from "./FormatError";
import {loggerCli, loggerFile} from '../../Infrastructure/Shared/Logger';
import {ErrorExceptionMapper} from './ErrorExceptionMapper';
import ErrorHttpException from "../../Application/Shared/ErrorHttpException";

export class ErrorHandler
{
    static handle(err: any, req: any, res: any, next: any)
    {
        const responder = new Responder();
        const formatError = new FormatError();

        let exception: ErrorHttpException = ErrorExceptionMapper.handle(err);

        if (exception.statusCode.code === StatusCode.HTTP_INTERNAL_SERVER_ERROR.code)
        {
            const meta = {
                code: StatusCode.HTTP_INTERNAL_SERVER_ERROR.code,
                method: req.method,
                path: req.path,
                payload: req.body,
                date: moment().toISOString()
            };

            loggerFile.error(err.stack, meta);
        }

        loggerCli.debug(err.stack);

        responder.error(formatError.getFormat(exception), req, res, exception.statusCode);
    }
}
