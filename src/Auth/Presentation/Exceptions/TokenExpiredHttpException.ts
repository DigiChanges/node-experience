import { StatusCode, ErrorHttpException } from '@digichanges/shared-experience';

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
