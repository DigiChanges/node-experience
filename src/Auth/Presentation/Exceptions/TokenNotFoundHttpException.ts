import { ErrorHttpException } from '../../../Main/Presentation/Exceptions/ErrorHttpException';
import { StatusCode } from '../../../Main/Presentation/Application/StatusCode';

class TokenNotFoundHttpException extends ErrorHttpException
{
    constructor()
    {
        const key = 'auth.presentation.exceptions.tokenNotFound';
        super({
            statusCode: StatusCode.HTTP_FORBIDDEN,
            errorMessage:
            {
                message: 'Token not found.',
                errorCode: key
            }
        });
    }
}

export default TokenNotFoundHttpException;
