import DuplicateEntityHttpException from "../Exceptions/DuplicateEntityHttpException";

import ExceptionFactory from "./ExceptionFactory";

export class ErrorExceptionMapper
{
    static handle(err: any)
    {
        let exception: any = {
                statusCode: null,
                message: null,
                errors: null
        };

        if (err?.name === "MongoError")
        {
            if (err.code === 11000)
            {
                const _exception = new DuplicateEntityHttpException();

                exception.statusCode = _exception.statusCode;
                exception.message = _exception.message;
            }
        }
        else
        {
            const exceptionFactory = new ExceptionFactory();

            exception = exceptionFactory.getException(err);
        }

        return exception;
    }
}
