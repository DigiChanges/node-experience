import DecryptForbiddenHttpException from "../Exceptions/DecryptForbiddenHttpException";
import BadCredentialsHttpException from "../Exceptions/BadCredentialsHttpException";
import UserDisabledHttpException from "../Exceptions/UserDisabledHttpException";
import CantDisabledHttpException from "../Exceptions/CantDisabledHttpException";
import PasswordWrongHttpException from "../Exceptions/PasswordWrongHttpException";
import DuplicateEntityHttpException from "../Exceptions/DuplicateEntityHttpException";

import DecryptForbiddenException from "../../Infrastructure/Exceptions/DecryptForbiddenException";

import BadCredentialsException from "../../Domain/Exceptions/BadCredentialsException";
import UserDisabledException from "../../Domain/Exceptions/UserDisabledException";
import CantDisabledException from "../../Domain/Exceptions/CantDisabledException";
import PasswordWrongException from "../../Domain/Exceptions/PasswordWrongException";
import NotFoundException from "../../Infrastructure/Exceptions/NotFoundException";
import NotFoundHttpException from "../Exceptions/NotFoundHttpException";

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
        else if(err?.name === DecryptForbiddenException.name)
        {
            const _exception = new DecryptForbiddenHttpException();

            exception.statusCode = _exception.statusCode;
            exception.message = _exception.message;
        }
        else if(err?.name === BadCredentialsException.name)
        {
            const _exception = new BadCredentialsHttpException();

            exception.statusCode = _exception.statusCode;
            exception.message = _exception.message;
        }
        else if(err?.name === UserDisabledException.name)
        {
            const _exception = new UserDisabledHttpException();

            exception.statusCode = _exception.statusCode;
            exception.message = _exception.message;
        }
        else if(err?.name === CantDisabledException.name)
        {
            const _exception = new CantDisabledHttpException();

            exception.statusCode = _exception.statusCode;
            exception.message = _exception.message;
        }
        else if(err?.name === PasswordWrongException.name)
        {
            const _exception = new PasswordWrongHttpException();

            exception.statusCode = _exception.statusCode;
            exception.message = _exception.message;
        }
        else if(err?.name === NotFoundException.name)
        {
            const _exception = new NotFoundHttpException(err.message);

            exception.statusCode = _exception.statusCode;
            exception.message = _exception.message;
        }
        else
        {
            exception = err;
        }

        return exception;
    }
}
