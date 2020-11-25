import DecryptForbiddenHttpException from "../Exceptions/DecryptForbiddenHttpException";
import BadCredentialsException from "../../Domain/Exceptions/BadCredentialsException";
import ErrorHttpException from "../../Application/Shared/ErrorHttpException";
import StatusCode from "./StatusCode";
import BadCredentialsHttpException from "../Exceptions/BadCredentialsHttpException";
import UserDisabledHttpException from "../Exceptions/UserDisabledHttpException";
import CantDisabledHttpException from "../Exceptions/CantDisabledHttpException";
import PasswordWrongHttpException from "../Exceptions/PasswordWrongHttpException";
import NotFoundHttpException from "../Exceptions/NotFoundHttpException";

class ExceptionFactory
{
    private exceptionsMapper: any = {
        'DecryptForbiddenException': new DecryptForbiddenHttpException(),
        'BadCredentialsException': new BadCredentialsHttpException(),
        'UserDisabledException': new UserDisabledHttpException(),
        'CantDisabledException': new CantDisabledHttpException(),
        'PasswordWrongException': new PasswordWrongHttpException(),
        'NotFoundException': new NotFoundHttpException(),
        'ErrorHttpException': new ErrorHttpException(StatusCode.HTTP_INTERNAL_SERVER_ERROR, "Internal Error", []),
        'Error': new ErrorHttpException(StatusCode.HTTP_INTERNAL_SERVER_ERROR, "Internal Error", []),
    };

    public getException(err: any): ErrorHttpException
    {
        const exception = this.exceptionsMapper[err?.name || 'ErrorHttpException'];

        exception.message = err.message;

        return exception;
    }
}

export default ExceptionFactory;