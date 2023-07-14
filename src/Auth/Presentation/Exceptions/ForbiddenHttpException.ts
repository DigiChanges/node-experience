import { ErrorHttpException, StatusCode } from '@digichanges/shared-experience';

class ForbiddenHttpException extends ErrorHttpException
{
    constructor()
    {
        const key = 'auth.presentation.exceptions.forbidden';
        super(StatusCode.HTTP_FORBIDDEN, {
            message: 'Forbidden.',
            errorCode: key
        });
    }
}

export default ForbiddenHttpException;
