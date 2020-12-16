import DecryptForbiddenHttpException from "../Exceptions/DecryptForbiddenHttpException";
import ErrorHttpException from "../../Application/Shared/ErrorHttpException";
import StatusCode from "./StatusCode";
import BadCredentialsHttpException from "../Exceptions/BadCredentialsHttpException";
import UserDisabledHttpException from "../Exceptions/UserDisabledHttpException";
import CantDisabledHttpException from "../Exceptions/CantDisabledHttpException";
import PasswordWrongHttpException from "../Exceptions/PasswordWrongHttpException";
import NotFoundHttpException from "../Exceptions/NotFoundHttpException";
import TokenExpiredHttpException from "../Exceptions/TokenExpiredHttpException";
import DuplicateEntityHttpException from "../Exceptions/DuplicateEntityHttpException";

class ExceptionFactory
{
    private exceptionsMapper: any = {
        'DecryptForbiddenException': new DecryptForbiddenHttpException(),
        'BadCredentialsException': new BadCredentialsHttpException(),
        'UserDisabledException': new UserDisabledHttpException(),
        'CantDisabledException': new CantDisabledHttpException(),
        'PasswordWrongException': new PasswordWrongHttpException(),
        'NotFoundException': new NotFoundHttpException(),
        'Error': new ErrorHttpException(StatusCode.HTTP_INTERNAL_SERVER_ERROR, "Internal Error", []),
        'ErrorHttpException': new ErrorHttpException(StatusCode.HTTP_INTERNAL_SERVER_ERROR, "Internal Error", []),
    };

    public getException(err: any): ErrorHttpException
    {
        let exception = this.exceptionsMapper[err?.name || 'Error'];

        exception.message = err?.message || exception.message;

        if (err instanceof ErrorHttpException)
        {
            exception.statusCode = err.statusCode;
            exception.message = err.message;
            exception.errors = err.errors;
        }
        else if(err instanceof Error && err.message === "Token expired")
        {
            exception = new TokenExpiredHttpException();
        }
        else if (err?.name === "MongoError")
        {
            if (err.code === 11000)
            {
                exception = new DuplicateEntityHttpException();
            }
        }

        return exception;
    }
}

export default ExceptionFactory;