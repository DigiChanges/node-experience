import { ErrorHttpException } from '../../../Main/Presentation/Exceptions/ErrorHttpException';
import { StatusCode } from '../../../Main/Presentation/Application/StatusCode';

class TokenExpiredHttpException extends ErrorHttpException
{
    constructor()
    {
        const key = 'auth.presentation.exceptions.tokenExpired';
        super(StatusCode.HTTP_FORBIDDEN, {
            message: 'Invalid userId.',
            errorCode: key
        });
    }
}

export default TokenExpiredHttpException;
