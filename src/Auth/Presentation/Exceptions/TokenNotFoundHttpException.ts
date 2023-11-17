import { ErrorHttpException, StatusCode } from '@digichanges/shared-experience';

class TokenNotFoundHttpException extends ErrorHttpException
{
    constructor()
    {
        const key = 'auth.presentation.exceptions.tokenNotFound';
        super(StatusCode.HTTP_FORBIDDEN, {
            message: 'Token not found',
            errorCode: key
        });
    }
}

export default TokenNotFoundHttpException;
